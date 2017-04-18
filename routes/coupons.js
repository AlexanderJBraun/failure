const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Coupon = require('../models/coupon');
const mongojs = require('mongojs');
const db = mongojs('mongodb://localhost:27017/liquidNitro');


router.get('/coupons', function(req, res, next){
  
  db.coupons.find(function(err, coupons)
  {
    if(err){
      res.send(err);
    }
    res.json(coupons);
  });
});

// add product
router.post('/newCoupons', (req, res, next) => {
  let newCoupon = new Coupon(req.body);
  
  Coupon.addCoupon(newCoupon, (err, product) => {
    if(err){
      console.log(err);
      res.json({success: false, msg:'Failed to add coupon'});
    } else {
      res.json({success: true, msg:'Coupon Added'});
    }
  });

});


// Get Single product
router.get('/coupon/:id', function(req, res, next){
    db.coupons.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, coupon){
        if(err){
            res.send(err);
        }
        res.json(coupon);
    });
});

//remove product
router.delete('/coupon/:id', function(req, res, next){
    db.coupons.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, coupon){
        if(err){
            res.send(err);
        }
        res.json(coupon);
    });
});


router.put('/editcoupon',function(req, res, next)
{
  console.log("in the back end");
console.log(req.body);
var name= req.body.name;
db.coupons.update({_id: mongojs.ObjectId(req.body.pID)},{$set:{couponCode:req.body.updatedItem}});

});

module.exports = router;
