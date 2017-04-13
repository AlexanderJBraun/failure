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
    console.log("hello");
    console.log(req.body.order);

    db.order.insert({"orderNumber":101,"userId":105,"products":{
        "product":{
            "name":req.body.order
        }
    }})

})

router.get('/orders',function(req,res,next)
{

})

module.exports = router;