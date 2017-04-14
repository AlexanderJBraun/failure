const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const mongojs = require('mongojs');
const db = mongojs('mongodb://localhost:27017/liquidNitro');

// User Schema
const ProductSchema = mongoose.Schema({
  itemCode: {
    type: String,
    required: true,
    unique: true
  },
  itemDescription: {
    type: String,
   
  },
  price: {
    type: Number,
   
  },
  inStock: {
    type: Number,
   
  }
});






module.exports.getProductById = function(id, callback)
{
  Product.findById(id, callback);
}

const Product = module.exports = mongoose.model('Product', ProductSchema);


module.exports.addProduct = function(newProduct, callback)
{

  newProduct.save(callback);

}

module.exports.getProductByProductname = function(itemCode, callback)
{
  const query = {itemCode: itemCode}
  Product.find(query, callback);
}

module.exports.updateInventory= function(deduct,pID)
{
  const query = {itemCode:pID};
  const update = {inStock:deduct}
//db.products.update({_id: mongojs.ObjectId(pID)},{inStock:19},{d});


}


