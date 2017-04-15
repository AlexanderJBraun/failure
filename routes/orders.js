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

}) ;

router.get('/orderNumber', function(req,res,next)
{
    db.order.findOne({_id:mongojs.ObjectId('58f26c8ef705943bcc243e5c')},function(err,orderNumber){
        if(err){
            res.send(err)
        }
        res.send(orderNumber);
    })

    db.order.update({_id:mongojs.ObjectId('58f26c8ef705943bcc243e5c')}, {$inc:{orderNumber:1}});

});
router.get('/orders',function(req,res,next)
{
 
})

module.exports = router;