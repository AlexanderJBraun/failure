const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const mongojs = require('mongojs');
const db = mongojs('mongodb://localhost:27017/liquidNitro');


router.post('/saveorder', function(req, res, next)
{
    var n = new Date();
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();
    var h = n.getHours();
    var mm = n.getMinutes();

   
    db.vendorOrder.insert({
        "vendorOrderNumber":req.body.orderNumber,
        "vDate": m+"/"+d+"/"+y+" "+h +":"+mm,
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
<<<<<<< HEAD
      db.vendorOrder.update({_id:mongojs.ObjectId('58f6af4e8b96c325440054cb')}, {$inc:{vendorOrderNumber:1}});
=======
      db.vendorOrder.update({_id:mongojs.ObjectId('58f6f082734d1d33b3276501')}, {$inc:{vendorOrderNumber:1}});
>>>>>>> fbeec9a81e2cd11a8112659b6cb188aaa2c38ec8

 });

 
router.get('/orderNumber', function(req,res,next)
{
<<<<<<< HEAD
    db.vendorOrder.findOne({_id:mongojs.ObjectId('58f6af4e8b96c325440054cb')},function(err,vendorOrderNumber){
=======
    db.vendorOrder.findOne({_id:mongojs.ObjectId('58f6f082734d1d33b3276501')},function(err,vendorOrderNumber){
>>>>>>> fbeec9a81e2cd11a8112659b6cb188aaa2c38ec8
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