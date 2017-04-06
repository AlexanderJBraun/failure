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

var originalFile = '../kirkwoodsite/invoice.html';
var baseDir='../kirkwoodsite/';
var recipient = 'mlnp3@mail.umsl.edu';

var options = {noCSS: true};
var styliner = new Styliner(baseDir, options);


router.post('/invoice', function(req, res, next){

   // console.log(req.body);
         for (var product in req.body)
     {
        console.log( req.body[product].product.name);
           
     }
    var fs=require('fs')

fs.readFile(originalFile, 'utf8', function(err,data){
    if(err) {
        return console.log(err);
    }

   styliner.processHTML(data).then(function(source)
    {
        sendMail(source);

       fs.writeFile("newIndex.html", source, function(err){
            if(err){
                return console.log(err);
            }

           console.log("the file was saved");
        })
    })
})


// console.log(req.body);
//      for (var product in req.body)
//      {
           
//      }

   var subjectTime = new Date();

   // var mailOptions = {
    //     from: 'kirkwoodsite21@gmail.com',
    //     to: 'ctch5@mail.umsl.edu',
    //     subject: 'Testing Shit - ' + subjectTime,
    //     html: "<!DOCTYPE html><table><th>test</th><html><head>"
      
    // };

//sendMail(mailOptions);
function sendMail(source) {
    var transporter = nodeMailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'kirkwoodsite21@gmail.com',
            pass: '123456789test'
        }
    });

   var mailOptions = {
        from: 'kirkwoodsite21@gmail.com',
        to: recipient,
        subject: 'Testing - ' + subjectTime,
        html: source

     
    };
    
    transporter.sendMail(mailOptions, function (err, info) {
        if(err) {
            return console.log(err);
        }
        console.log('Message sent: ' + info.response);
        console.log("email sent to " + mailOptions.to  + "..." + new Date());

   });
}

});




// function sendMail(source) {
//     var transporter = nodeMailer.createTransport({
//         service: 'Gmail',
//         auth: {
//             user: 'kirkwoodsite21@gmail.com',
//             pass: '123456789test'
//         }
//     });

//     var mailOptions = {
//         from: 'kirkwoodsite21@gmail.com',
//         to: recipient,
//         subject: 'Testing - ' + subjectTime,
//         html: source

      
//     };
    
//     transporter.sendMail(mailOptions, function (err, info) {
//         if(err) {
//             return console.log(err);
//         }
//         console.log('Message sent: ' + info.response);
//         console.log("email sent to " + mailOptions.to  + "..." + new Date());

//     });
// }

// var fs=require('fs')

// fs.readFile(originalFile, 'utf8', function(err,data){
//     if(err) {
//         return console.log(err);
//     }

//     styliner.processHTML(data).then(function(source)
//     {
//         sendMail(source);

//         fs.writeFile("newIndex.html", source, function(err){
//             if(err){
//                 return console.log(err);
//             }

//             console.log("the file was saved");
//         })
//     })
// })


module.exports = router;