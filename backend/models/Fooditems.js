const mongoose = require("mongoose");

//food items ka template

const FooditemSchema = new mongoose.Schema({
  item_no: {
    type: Number,
    require: true,
  },
  f_img: {
    type: String,
    require: true,
  },
  naam: String,
  rating:Number,
  price: Number,
  desc: String,
  foodtype:String,
});

const Food_item = mongoose.model("Food_item", FooditemSchema);

module.exports = Food_item;
