const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const mongojs = require('mongojs');
const db = mongojs('mongodb://localhost:27017/liquidNitro');


// User Schema
const CouponSchema = mongoose.Schema({
  couponCode: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean
  }
   
});

const Coupon = module.exports = mongoose.model('Coupon', CouponSchema);


module.exports.addCoupon = function(newCoupon, callback)
{
  newCoupon.save(callback);
}

module.exports.getCoupontByCouponname = function(couponCode, callback)
{
  const query = {couponCode: couponCode}
  Coupon.find(query, callback);
}