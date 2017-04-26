const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Product = require('../models/product');
const mongojs = require('mongojs');
const db = mongojs('mongodb://localhost:27017/liquidNitro');


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
  var newProduct = new Product(req.body);
  
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
   console.log(req.body.pID);
   console.log(req.body.pID);
  db.products.update({_id: mongojs.ObjectId(req.body.pID)},{$set:{inStock:req.body.add}});

});

router.post('/editproduct',function(req, res, next)
{

var name= req.body.name;
db.products.update({_id: mongojs.ObjectId(req.body._id)},{itemCode:req.body.itemCode,
                                                          price:req.body.price,
                                                          description:req.body.description,
                                                          vendorPrice:req.body.vendorPrice,
                                                          inStock:req.body.inStock
                                                        })
    res.json({
      success:true
    })
});

module.exports = router;
