require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const session = require("cookie-session");
const passport = require("passport");
var LocalStrategy = require("passport-local");
const passportlocalmongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
var findOrCreate = require("mongoose-findorcreate");
const Users = require("../models/Users");
const User_Cart = require("../models/User_Cart");
const Food_item = require("../models/Fooditems");

//for the payment system 
const stripe=require("stripe")(process.env.STRIPE_PRIVATE_KEY)


// variable to store the info , whether user is logged in or not (true/false);
var check_login_logout= false;

//variable to store the user email
var user_mail= null;

//variable to store the loggedin user name
var user_name = null;

//for local strategy
passport.use(Users.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
      username: user.username,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});


//authentication using google , (process)
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: "http://localhost:999/user/google/auth/authorized",
      scope: ["profile", "email"]
      // userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo"
    },
    function (accessToken, refreshToken, profile, email, cb) {
      // console.log( email.name.givenName)

      //storing user name
      user_name = email.name.givenName;

      //storing the logged in user email
      user_mail=email.emails[0].value;
      Users.findOrCreate({ username: email.emails[0].value},{googleID:profile.id}, function (err, user) {
        if(err){
          return cb(err)
        }
        return cb(err, user);
      });
    }
  )
);


const router = express.Router();


router.get("/register", (req, res) => {
  res.render('register');
});

//calling google for verification  , and in scope , we are asking for , what we want in return
router.get("/auth/google",

  passport.authenticate("google", { scope: ["profile" , "email"] })
);

//authentication of user is done by google 
router.get("/google/auth/authorized",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/user/authenticated");
  }
);

//rendering the login page 
router.get("/login", (req, res) => {
  res.render("login");
});

//checking the user authentication and allowing it to proceed further
router.get("/authenticated", (req, res) => {
  if (req.isAuthenticated()) {
    check_login_logout=true;
    console.log("mai redirect me hu");
    res.redirect("http://localhost:3000");
  } else {
    res.redirect("/login");
  }
});

//registering user , manually
router.post('/register', function(req, res) {
  Users.register(new Users({ username : req.body.username }), req.body.password, function(err, account) {
      if (err) {
        console.log(err)
          return res.render('register');
      }

      passport.authenticate('local')(req, res, function () {
        res.redirect('/user/authenticated');
      });
  });
});

//finishing the user session , and logging out the user
router.get("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) {
      console.log("error is logging out");
    } else {
      console.log("i am logout");
      check_login_logout = false
      res.redirect("http://localhost:3000");
    }
  });
});


// when login request comes in 
router.post("/login", async (req, res) => {
  const user = new Users({
    username: req.body.username,
    password: req.body.password,
  });
  req.login(user, function (err) {
    if (err) {
      console.log("error in logging in", err);
      res.redirect("/login");
    }
    passport.authenticate("local")(req, res, function (err, user, info) {
      if (err) {
        console.log("error aa rhi hai ", err);
      }
      console.log("autht");
      res.redirect("/user/authenticated")
    });
  });
});


//sending the loging status 
router.get("/loginlogoutstatus" , (req,res)=>{
  try{
    const user_details= [check_login_logout , user_name];

    res.json(user_details);


  }catch(err){
    console.log("error in checking login or logout = " , err)
  }
  
})


//api endpoint to add the selected product to the cart
router.post("/addtocart", async (req, res) => 
{

  console.log('hi i am in the cart',req.body);

 

  console.log("pehle kya value thi ",temp);

  //temp is storing a array , if array is empty , it means the item is not present in the user cart already , so e wil add it 
  //if temp is not empty , it means , it is present alredy , so we are not adding it again .
  var temp = await User_Cart.find({
    $and: [
      { userid_of_cart_owner: user_mail },
      { product_id: req.body.p_details }
    ]
  });


  console.log("null hai ki nhi =>" , temp)
  // if item is not present , therefore new item is adding up
  if (temp.length === 0)
  {

     //geting the product details
    const product_to_add_in_the_cart = await Food_item.findOne({_id :req.body.p_details})
  
  

    const new_cart_item = new User_Cart ({
      userid_of_cart_owner: user_mail,
      product_id:product_to_add_in_the_cart._id,
      product_img: product_to_add_in_the_cart.f_img,
      product_name:product_to_add_in_the_cart.naam,
      product_price: product_to_add_in_the_cart.price,
      product_quantity: 1,
    });
    new_cart_item.save();
  }
  return
}
);


//api endpoint to get the user_cart data
router.get("/cart_data" , async(req,res)=>{

  const user_cart_array= await User_Cart.find({userid_of_cart_owner:user_mail});
  
  res.json(user_cart_array)

})


//post request is coming here , to the payement gateway
router.post("/checkout", async (req, res) => {
  console.log(req.body.cart_data);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment", 
      line_items: req.body.cart_data.map((item) => {
        return {
          price_data: {
            currency: 'inr',
            product_data: {
              name: item.product_name,
            },
            // unit amount is in paisa,
            unit_amount: item.product_price * 100, 
          },
          quantity: item.product_quantity
        };
      }),
      success_url: `${process.env.SERVER_URL}`,
      cancel_url: `${process.env.SERVER_URL}/cancel`, // Specify a cancel URL
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


module.exports = router;
