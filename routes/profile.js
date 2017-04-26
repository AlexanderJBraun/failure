const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/order');
const mongojs = require('mongojs');
const db = mongojs('mongodb://localhost:27017/liquidNitro');


router.get('/getytds',function(req, res, next){

db.sales.findOne({_id:mongojs.ObjectId('58fce0c9fdafae19441e5089')},function(err,yearToDateSales){
        if(err){
            res.send(err)
        }
        res.send(yearToDateSales);
    })





});

router.post('/updateSales',function(req, res, next){

    console.log(req.body.sales);
    db.sales.update({_id:mongojs.ObjectId('58fce0c9fdafae19441e5089')}, {$inc:{YTDS:req.body.sales}});

});

module.exports = router;