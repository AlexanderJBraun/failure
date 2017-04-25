const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const mongojs = require('mongojs');
const db = mongojs('mongodb://localhost:27017/liquidNitro');


router.post('/saveorder', function(req, res, next)
{


   
    db.vendorOrder.insert({
        "vendorOrderNumber":req.body.orderNumber,
        "vDate": new Date(),
        // "Customer": req.body.userID.fName + req.body.userID.lName,
        // "userId":req.body.userID._id,
        "vProducts": req.body.order,
        "vTotal" : req.body.totalSum,
        "isReceived": false
                   
    })

    res.json({
        success: true
    })
});

 router.get('/updateOrderNumber', function(req,res,next)
 {
    console.log('update order number');
      db.vendorOrder.update({_id:mongojs.ObjectId('58ffb349ecfa4c161cb3b4a7')}, {$inc:{vendorOrderNumber:1}});

 });

 
router.get('/orderNumber', function(req,res,next)
{
    db.vendorOrder.findOne({_id:mongojs.ObjectId('58ffb349ecfa4c161cb3b4a7')},function(err,vendorOrderNumber){
        if(err){
            res.send(err)
        }
        res.send(vendorOrderNumber);
    })

   
 
});

router.get('/orders',function(req,res,next)
{
 db.vendorOrder.find(function(err, orders)
  {
    if(err){
      res.send(err);
    }
    res.json(orders); 
  });
})

module.exports = router;