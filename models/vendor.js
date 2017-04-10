const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const mongojs = require('mongojs');
const db = mongojs('mongodb://localhost:27017/liquidNitro');

// User Schema
const VendorSchema = mongoose.Schema({
  itemCode: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});






module.exports.getVendorById = function(id, callback)
{
  Vendor.findById(id, callback);
}

const Vendor = module.exports = mongoose.model('Vendor', VendorSchema);


module.exports.addVendor = function(newVendor, callback)
{

  newVendor.save(callback);

}

module.exports.getVendorByVendorname = function(itemCode, callback)
{
  const query = {itemCode: itemCode}
  Vendor.find(query, callback);
}

module.exports.updateInventory= function(deduct,pID)
{
  const query = {itemCode:pID};
  const update = {inStock:deduct}
db.vendors.update({_id: mongojs.ObjectId(pID)},{inStock:19});


}


