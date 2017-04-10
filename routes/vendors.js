const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Vendor = require('../models/vendor');
const mongojs = require('mongojs');
const db = mongojs('mongodb://localhost:27017/liquidNitro');


router.get('/vendors', function(req, res, next){
  
  db.vendors.find(function(err, vendors)
  {
    if(err){
      res.send(err);
    }
    res.json(vendors);
  });
});

// add vendor
router.post('/newVendor', (req, res, next) => {
  let newVendor = new Vendor(req.body);

  Vendor.addVendor(newVendor, (err, vendors) => {
    if(err){
      res.json({success: false, msg:'Failed to add vendor'});
    } else {
      res.json({success: true, msg:'vendor Added'});
    }
  });
});


// Get Single vendor
router.get('/vendor/:id', function(req, res, next){
    db.vendors.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, vendor){
        if(err){
            res.send(err);
        }
        res.json(vendor);
    });
});

//remove vendor
router.delete('/vendor/:id', function(req, res, next){
    db.vendors.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, vendor){
        if(err){
            res.send(err);
        }
        res.json(vendor);
    });
});

router.put('/updateinventory', function(req, res, next)
{
   console.log(req.body.pID);
  db.vendors.update({_id: mongojs.ObjectId(req.body.pID)},{$set:{inStock:req.body.deduct}});
  
 
  
  


});


module.exports = router;
