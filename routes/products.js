const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Product = require('../models/product');
const mongojs = require('mongojs');
const db = mongojs('mongodb://mlangi:123456789@ds163940.mlab.com:63940/liquidnitro');


router.get('/products', function(req, res, next){
  
  db.products.find(function(err, products)
  {
    if(err){
      res.send(err);
    }
    res.json(products);
  });
});

// add product
router.post('/newProduct', (req, res, next) => {
  let newProduct = new Product(req.body);
  
  Product.addProduct(newProduct, (err, product) => {
    if(err){
      console.log(err);
      res.json({success: false, msg:'Failed to add product'});
    } else {
      res.json({success: true, msg:'Product Added'});
    }
  });

});


// Get Single product
router.get('/product/:id', function(req, res, next){
    db.products.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, product){
        if(err){
            res.send(err);
        }
        res.json(product);
    });
});

//remove product
router.delete('/product/:id', function(req, res, next){
    db.products.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, product){
        if(err){
            res.send(err);
        }
        res.json(product);
    });
});

router.put('/updateinventory', function(req, res, next)
{
   console.log(req.body.pID);
  db.products.update({_id: mongojs.ObjectId(req.body.pID)},{$set:{inStock:req.body.deduct}});

});

router.put('/addinventory', function(req, res, next)
{
   console.log(req.body.pID);
  db.products.update({_id: mongojs.ObjectId(req.body.pID)},{$set:{inStock:req.body.add}});

});

router.put('/editproduct',function(req, res, next)
{
  console.log("in the back end");
console.log(req.body);
var name= req.body.name;
db.products.update({_id: mongojs.ObjectId(req.body.pID)},{$set:{itemCode:req.body.updatedItem}});

});

module.exports = router;
