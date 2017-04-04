const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const mongojs = require('mongojs');
const db = mongojs('mongodb://localhost:27017/liquidNitro');
var nodeMailer = require('nodemailer');


router.post('/invoice', function(req, res, next){
    
console.log(req.body);
     for (var product in req.body)
     {
           
     }

    var subjectTime = new Date();

    var mailOptions = {
        from: 'kirkwoodsite21@gmail.com',
        to: 'mlnp3@mail.umsl.edu',
        subject: 'Testing Shit - ' + subjectTime,
        html: '<!DOCTYPE html><html><head>'
       
    };

sendMail(mailOptions);

});




function sendMail(mailOptions) {
    var transporter = nodeMailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'kirkwoodsite21@gmail.com',
            pass: '123456789test'
        }
    });
    
    transporter.sendMail(mailOptions, function (err, info) {
        if(err) {
            return console.log(err);
        }
        console.log('Message sent: ' + info.response);
        console.log("email sent to " + mailOptions.to + "..." + new Date());

    });
}


module.exports = router;