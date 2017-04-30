const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/order');
const mongojs = require('mongojs');
const db = mongojs('mongodb://localhost:27017/liquidNitro');


router.post('/saverorder', function(req, res, next)
{
    var n = new Date();
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();
    var h = n.getHours();
    var mm = n.getMinutes();
    console.log(req.body);
   
    db.order.insert({
        "orderNumber":req.body.orderNumber,
        "date": m+"/"+d+"/"+y+" "+h +":"+mm,
        "customerbName": req.body.userID.bName,
        "Customer": req.body.userID.fName + " " + req.body.userID.lName,
        "userId":req.body.userID._id,
        "products": req.body.order,
        "subTotalSum":req.body.subTotalSum,
        "discount": req.body.couponAmount,
        "Total" : req.body.totalSum,
        "isPaid": false,
        "isDel": false
                   
    })

    res.json({
        success: true
    })
});

//master's branch orderNumberID: 58f5428e16d1bd21c808a708
//Chau's lab computer orderNumberID: 58fa243c94df1725d4b1d0fb
 router.get('/updateOrderNumber', function(req,res,next)
 {
  

      db.order.update({_id:mongojs.ObjectId('58f26c8ef705943bcc243e5c')}, {$inc:{orderNumber:1}});


 });

 
router.get('/orderNumber', function(req,res,next)
{

    db.order.findOne({_id:mongojs.ObjectId('58f26c8ef705943bcc243e5c')},function(err,orderNumber){
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
});

router.post('/isPaid',function(req,res,next)
{

    console.log(req.body.id);
 db.order.update({_id:mongojs.ObjectId(req.body.id)}, {$set:{isPaid:true}});

});

router.post('/isDelivered',function(req,res,next)
{

    console.log(req.body);
 db.order.update({_id:mongojs.ObjectId(req.body.id)}, {$set:{isDel:true}});

});

router.post('/ordersbyuser',function(req,res,next)
{
    console.log(req.body);
    db.order.find({"userId": req.body.id}, function(err,userOrder)
    {
        if(err)
        {
            res.send(err)
        }
        res.send(userOrder)
    })

});


module.exports = router;