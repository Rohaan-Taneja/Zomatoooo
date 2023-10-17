const mongoose = require("mongoose");
const passportlocalmongoose= require("passport-local-mongoose");


// cart template

const CartSchema = new mongoose.Schema({

  //whose cart is this 
  userid_of_cart_owner: {
    type: String,
    require: true
    
  },
  product_id: {
    type: String,
  },

  product_img: {
    type: String,
  },

  product_name: {
    type: String,
    
  },
  product_price: {
    type: String,
    
  },
  product_quantity: {
    type: Number,
    
  },
  
});

const User_Cart = mongoose.model("User_Cart", CartSchema);

module.exports = User_Cart;