require("@babel/register");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const ejs = require("ejs");
var cors = require("cors");
const app = express();
app.use(cors());
const session = require("express-session");
const passport = require("passport");

//to load the react component from the backend , when user search for a restaurant
//from the navbar , for the backend we will render
//the frontend component = productpage.jsx
// const ReactDOMServer = require('react-dom/server');
// const Productpage= require('../frontend/z_front/src/components/Product_page_componenets/Productpage').default;

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(express.json()); // to parse JSON data
app.use(express.urlencoded({ extended: true }));

///// auth ka samaan
app.set("trust proxy", 1);

app.use(
  session({
    secret: "thisismysecret",
    resave: true,
    saveUninitialized: true,
  })
);

//initializing the passport and session management system
app.use(passport.initialize());
app.use(passport.session());

//user authentication
//if any call comes to the server for the /users(user authentication) ,
// then it is handled by auth file (path of which is given afterwards)
app.use("/user", require("./Routes/auth"));

//connection part  to mongodb atlas
const username = "Rohaan";
const password = "Rohaan@123";
const dbName = "zomatoo_food";

const dbURI = `mongodb+srv://Rohaan:${encodeURIComponent(
  password
)}@cluster0.mcsmqnh.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connection established to MongoDB");
  })
  .catch((err) => {
    console.error("Error occurred while connecting to MongoDB:", err);
  });

// server listening part process.env.PORT
// did changes here
app.listen(process.env.PORT, () => {
  console.log(`Server running `);
});

// fooditem module call part
const Food_item = require("./models/Fooditems");
const { type } = require("os");

app.get("/fitem", async (req, res) => {
  try {
    const food = await Food_item.find({});
    res.json(food);
    console.log("hello ji");
  } catch (error) {
    console.error("Error while fetching food item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// food items upload part
app.get("/uplaod_food_details", (req, res) => {
  res.sendFile(__dirname + "/Upload-fooddata.html");
});

// image storage sytem , (images storing in frontend images folder)
let storage = multer.diskStorage({
  destination: "../frontend/z_front/public/images",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
    console.log(req);
  },
});

let upload = multer({
  storage: storage,
});

// food data is gathered here and entered into the database
app.post("/", upload.single("food_img"), (req, res) => {
  console.log(req.body);
  console.log(req.file);

  const newfood = new Food_item({
    f_img: req.file.path,
    naam: req.body.naam,
    rating: req.body.rating,
    price: req.body.price,
    desc: req.body.desc,
  });
  newfood.save();

  res.send("thank you ji");
});

// api endpoint for displaying all the cards
app.get("/api/data", async (req, res) => {
  try {
    const food_data = await Food_item.find({});

    // sending back all food items ids , instead of whole food data
    food_ids = [];
    for (let i in food_data) {
      food_ids.push(food_data[i]._id);
    }
    // console.log("hello",food_ids)
    res.json(food_ids);
  } catch (err) {
    console.log("error oocured while fetching data => ", err);
  }
});

// getting the data of individual food item
app.get("/api/specific_data", async (req, res) => {
  const food_id = req.query.id;
  // console.log(food_id)
  const individual_food_item_data = await Food_item.find({ _id: food_id });

  console.log(individual_food_item_data);
  res.json(individual_food_item_data);
});

// api endpoint for displaying all the data of  selected card details
app.get("/api/productdetails/:productid", async (req, res) => {
  const p_id = req.params.productid;

  const productdata = await Food_item.find({ _id: p_id });
  // console.log(productdata)
  res.json(productdata);
});

// ratings/ high_low filter query

app.get("/filter/:filter_query", async (req, res) => {
  const f_query = req.params.filter_query;

  if (f_query === "high_to_low") {
    const resultant_products = await Food_item.find({});
    console.log("i am hight to low");
    resultant_products.sort((a, b) => b.price - a.price);
    res.json(resultant_products);
  } else if (f_query === "low_to_high") {
    const resultant_products = await Food_item.find({});
    console.log("i am low to high");
    resultant_products.sort((a, b) => a.price - b.price);
    res.json(resultant_products);
  }

  //if query is for rating
  else {
    const resultant_products = await Food_item.find({
      rating: { $gte: f_query },
    });
    console.log("i am a rating number");
    res.json(resultant_products);
  }
});

//api request from overview section , to display the similar restaurants ,
// based on type field in database
app.get("/api/similar_restaurant/:foodtype", async (req, res) => {
  const selected_food_type = req.params.foodtype;
  console.log(selected_food_type);

  const similar_rest = await Food_item.find({ foodtype: selected_food_type });

  res.json(similar_rest);
});

//post requestion from search bar of the navbar , to search a restaurant
app.get("/restaurant/:searched_item", async (req, res) => {
  console.log("i am colled");
  const pname = req.params.searched_item;
  console.log(pname);
  const restaurantName = new RegExp(pname, "i");
  const find_restaurant = await Food_item.findOne({ naam: restaurantName });

  console.log(find_restaurant);
  if (find_restaurant == null) {
    console.log("null hai fir bhi nhi chl rha haai ");
    res.send(
      "<div>The restaurant with name is not listed on our ZOMATOO</div>"
    );
  } else {
    const food_id = find_restaurant._id;
    console.log(food_id);
    res.json(food_id);
  }
});
