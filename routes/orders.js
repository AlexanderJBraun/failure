const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/order');
const mongojs = require('mongojs');
const db = mongojs('mongodb://mlangi:123456789@ds163940.mlab.com:63940/liquidnitro');


router.post('/saverorder', function(req, res, next)
{

    console.log(req.body);
   
    db.order.insert({
        "orderNumber":req.body.orderNumber,
        "date": new Date(),
        "Customer": req.body.userID.fName + req.body.userID.lName,
        "userId":req.body.userID._id,
        "products": req.body.order,
        "Total" : req.body.totalSum
                   
    })

    res.json({
        success: true
    })
});

 router.get('/updateOrderNumber', function(req,res,next)
 {
    console.log('update order number');
      db.order.update({_id:mongojs.ObjectId('58f6f0cf734d1d33b32765ee')}, {$inc:{orderNumber:1}});

 });

 
router.get('/orderNumber', function(req,res,next)
{
    db.order.findOne({_id:mongojs.ObjectId('58f6f0cf734d1d33b32765ee')},function(err,orderNumber){
        if(err){
            res.send(err)
        }
        res.send(orderNumber);
    })

   
 
});

router.get('/orders',function(req,res,next)
{
 db.order.find(function(err, orders)
  {
    if(err){
      res.send(err);
    }
    res.json(orders); 
  });
})

module.exports = router;