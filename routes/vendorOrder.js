const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const mongojs = require('mongojs');
const db = mongojs('mongodb://mlangi:123456789@ds163940.mlab.com:63940/liquidnitro');


router.post('/saveorder', function(req, res, next)
{

    console.log(req.body);
   
    db.vendorOrder.insert({
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
      db.vendorOrder.update({_id:mongojs.ObjectId('58f6f082734d1d33b3276501')}, {$inc:{vendorOrderNumber:1}});

 });

 
router.get('/orderNumber', function(req,res,next)
{
    db.vendorOrder.findOne({_id:mongojs.ObjectId('58f6f082734d1d33b3276501')},function(err,vendorOrderNumber){
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