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
   
    console.log(req.body.order[0].product);
    console.log(req.body.order[0].quantity);

    db.order.insert({
        "orderNumber":101,
        "userId":105,
        "products":{
                    "product":{
                        "name":req.body.order[0].product.itemCode,
                        "description": req.body.order[0].product.description,
                        "price":req.body.order[0].product.price,
                        "quantity":req.body.order[0].quantity,
                        "subTotal":req.body.order[0].sgubTotal
                    }
    }})

})

router.get('/orders',function(req,res,next)
{

})

module.exports = router;