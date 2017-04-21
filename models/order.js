const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema
const OrderSchema = mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    
  },
  userId: {
    type: String,
    required: true
  },
  products: {
      product:{name:String,quantity:Number, price:Number, subTotal:Number}
  
  },
  isPaid:{
    type: Boolean
  }
}); 