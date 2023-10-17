const mongoose = require("mongoose");
const passportlocalmongoose= require("passport-local-mongoose");
var findOrCreate = require('mongoose-findorcreate');


// users data template

const UsersSchema = new mongoose.Schema({
  
  username: {
    type: String,
    require: true
    
  },

  password: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

UsersSchema.plugin(passportlocalmongoose, {
  usernameUnique: false,
});

UsersSchema.plugin(findOrCreate);

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
