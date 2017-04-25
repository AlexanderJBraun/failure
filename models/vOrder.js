const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema
const vOrderSchema = mongoose.Schema({
  vendorOrderNumber: {
    type: String,
    required: true,
    
  },
  vProducts: {
      product:{name:String,quantity:Number, price:Number, subTotal:Number}
  
  },
  isReceived: {
    type: Boolean
  }
}); 