const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const mongojs = require('mongojs');
const db = mongojs('mongodb://localhost:27017/liquidNitro');

var nodeMailer = require('nodemailer');
var Styliner = require('styliner');
var os = require("os");
var hostname = os.hostname();

var originalFile = '../kirkwoodsite/angular-src/src/app/components/cart/cart.component.html';
var baseDir='../kirkwoodsite/';

var options = {noCSS: true};
var styliner = new Styliner(baseDir, options);




router.post('/invoice', function(req, res, next){
    
  var fs=require('fs');
  var recipient =  req.body.user.email;

    console.log(req.body);

    var htmlBody= 
        '<h3>' + "Thank You " + req.body.user.fName + " " 
        + req.body.user.lName + " for your purchase!" + '</h3>' 
        + '<h3>' + "Your order will be delivered in the next few days to " 
        + req.body.user.address + '</h3>';    

    for (var index in req.body.product)
     {   
          htmlBody += 
        '<h4>' + req.body.product[index].product.item + " " 
          + req.body.product[index].product.description + " " 
          + req.body.product[index].product.price + " " 
          +  req.body.product[index].quantity + ": $" 
          + (req.body.product[index].subTotal) + '</h4>';
     }

     htmlBody += 
                '<h4>'+ "" + '</h4>' + '<h2>' + "Your total payment is: $"
                 + req.body.totalSum + '</h2>';


fs.readFile(originalFile, 'utf8', function(err,data)
{
    if(err) 
    {
        return console.log(err);
    }

   styliner.processHTML(data).then(function(source)
    {
        sendMail(source);
    })
})


function sendMail(source) 
{
    var transporter = nodeMailer.createTransport({
        service: 'Gmail',
        auth: 
        {
            user: 'kirkwoodsite21@gmail.com',
            pass: '123456789test'
        }
    });

   var mailOptions = 
   {
        from: 'kirkwoodsite21@gmail.com',
        to: recipient,
        subject: 'Testing',
        html: htmlBody
    };
    

    transporter.sendMail(mailOptions, function (err, info) 
    {
        if(err) 
        {
            return console.log(err);
        }
        console.log('Message sent: ' + info.response);
        console.log("email sent to " + mailOptions.to  + "..." + new Date());

   });
}

});

module.exports = router;