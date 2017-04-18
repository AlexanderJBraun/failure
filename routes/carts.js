const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
//const config = require('../angular-src/src/app/components/invoice/invoice.component.html');
const mongojs = require('mongojs');
const db = mongojs('mongodb://localhost:27017/liquidNitro');
//const roles= require('../angular-src/src/app/components/profile/role');

var nodeMailer = require('nodemailer');
var Styliner = require('styliner');
var os = require("os");
var hostname = os.hostname();

var originalFile = '../kirkwoodsite/angular-src/src/app/components/cart/cart.component.html';
var baseDir='../kirkwoodsite/';
var recipient = '';

var options = {noCSS: true};
var styliner = new Styliner(baseDir, options);


router.post('/invoice', function(req, res, next){

    var n = new Date();
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();
    // document.getElementById("date").innerHTML=m + "/" + d + "/" + y;

    
    


    var htmlBody= '<h3>' + "Thank You "  + " for your purchase!" + '</h3>' 
        + '<h3>' + "Your order will be delivered in the next few days"  + '</h3>'
        + '<h3>' + "Following is your invoice: " + '</h3>'
        + '<hr>'
        + '<div class="invoice-box" style="max-width: 800px;margin: auto;padding: 30px;border: 1px solid #eee;box-shadow: 0 0 10px rgba(0, 0, 0, .15);font-size: 16px;line-height: 24px;font-family: Helvetica, Arial, sans-serif;color: #555;">'
        + '<table cellpadding="0" cellspacing="0" style="width: 100%;line-height: inherit;text-align: left;">'
        + '<tr class="top">'
        + '<td colspan="2" style="padding: 5px;vertical-align: top;">'
        + '<table style="width: 100%;line-height: inherit;text-align: left;">'
        + '<tr>'
        + '<td class="title" style="padding: 5px;vertical-align: top;padding-bottom: 20px;font-size: 45px;line-height: 45px;color: #333;">'
        + '<img src="https://media.licdn.com/media/p/5/005/01b/32d/311cd18.png" style="width:100%; max-width:300px;">'
        + '</td>'
        + '<td style="padding: 5px;vertical-align: top;text-align: right;padding-bottom: 20px;">'
        + "Invoice #: "+ req.body.orderNumber + '<br>'
        + "Created: " + '<span>' + m + "/" + d + "/" + y + '</span>' + '<br>'
        + "Due: On Delivery"
        + '</td>'
        + '</tr>'
        + '</table>'
        + '</td>'
        + '</tr>'
        + '<tr class="information">'
        + '<td colspan="2" style="padding: 5px;vertical-align: top;">'
        + '<table style="width: 100%;line-height: inherit;text-align: left;">'
        + '<tr>'
        + '<td style="padding:5px; vertical-align:top; padding-bottom:40px; ">'
        + "Kirkwood Holdings LLC." + '<br>'
        + "Peter Donovan" + '<br>'
        + "1518 Still Forest Ct" + '<br>'
        + "St Peters, MO 63376"
        + '</td>'
        + '<td style="padding: 5px;vertical-align: top;text-align: right;padding-bottom: 40px;">'
        + req.body.user.bName + '<br>'
        + req.body.user.fName + " " + req.body.user.lName + "<br>"
        + req.body.user.address + '<br>'
        + req.body.user.city + ", " + req.body.user.state + " " + req.body.user.zip
        + '</td>'
        + '</tr>'
        + '</table>'
        + '</td>'
        + '</tr>'
        + '<hr>'
        + '<tr class="heading">'
        + '<td style="padding: 5px;vertical-align: top;background: #eee;border-bottom: 1px solid #ddd;font-weight: bold;">'
        + "Payment Method"
        + '</td>'
        + '</tr>'
        + '<tr class="details">'
        + '<td style="padding: 5px;vertical-align: top;padding-bottom: 20px;">'
        + "COD - Cash on Delivery"
        + '</td>'
        + '</tr>'
        + '<hr>'
        + '<tr class="heading">'
        + '<td style="padding: 5px;vertical-align: top;background: #eee;border-bottom: 1px solid #ddd;font-weight: bold;">'
        + "Item Name"
        + '</td>'
        + '<td style="padding: 5px;vertical-align: top;background: #eee;border-bottom: 1px solid #ddd;font-weight: bold;">'
        + "Item Description"
        + '</td>'
        + '<td style="padding: 5px;vertical-align: top;background: #eee;border-bottom: 1px solid #ddd;font-weight: bold;">'
        + "Item Quantity"
        + '</td>'
        + '<td style="padding: 5px;vertical-align: top;background: #eee;border-bottom: 1px solid #ddd;font-weight: bold;">'
        + "Unit Price"
        + '</td>'
        + '<td style="padding: 5px;vertical-align: top; text-align:right; background: #eee;border-bottom: 1px solid #ddd;font-weight: bold;">'
        + "Sub-Total"
        + '</td>'
        + '</tr>'
        ;

    console.log(req.body)
    
    var recipient = req.body.user.email; 

var name = String;

    // htmlBody +=
    
    console.log(req.body.product[0].product.name); 
    for (var index in req.body.product)
     {
         console.log(index);
         
            // htmlBody += '<h4>' + req.body.product[index].product.itemCode + " " + req.body.product[index].product.description + " " + req.body.product[index].product.price + " " 
            // +  req.body.product[index].quantity + ": $" + (req.body.product[index].subTotal) + '</h4>';
            htmlBody += '<tr class="item"'
            + '<td style="padding: 5px;vertical-align: top;border-bottom: 1px solid #eee;">'
            + req.body.product[index].product.itemCode
            + '</td>'
            + '<td style="padding: 5px;vertical-align: top;border-bottom: 1px solid #eee;">'
            + req.body.product[index].product.description
            + '</td>'
            + '<td style="padding: 5px;vertical-align: top;border-bottom: 1px solid #eee;">'
            + req.body.product[index].quantity
            + '</td>'
            + '<td style="padding: 5px;vertical-align: top;border-bottom: 1px solid #eee;">'
            + "$" + req.body.product[index].product.price
            + '</td>'
            + '<td style="padding: 5px;vertical-align: top; text-align:right; border-bottom: 1px solid #eee;">'
            + "$" + req.body.product[index].subTotal
            + '</td>'
            + '</tr>'
            ;
           
           
     }
    //  htmlBody += '<h4>'+ "" + '</h4>' + '<h2>' + "Your total payment is: $" + req.body.totalSum + '</h2>';
    htmlBody += '<tr class="total">'
            + '<td style="padding: 5px;vertical-align: top;">' + '</td>'
            + '<td style="padding: 5px;vertical-align: top;">' + '</td>'
            + '<td style="padding: 5px;vertical-align: top;">' + '</td>'
            + '<td style="padding: 5px;vertical-align: top;">' + '</td>'
            + '<td style="padding: 5px;vertical-align: top;border-top: 2px solid #eee;font-weight: bold;">'
            + "Total: " + "$" + req.body.totalSum
            + '</td>'
            + '</tr>'
            + '</table>'
            + '</div>'
            ;

    var fs=require('fs')

fs.readFile(originalFile, 'utf8', function(err,data){
    if(err) {
        return console.log(err);
    }

   styliner.processHTML(data).then(function(source)
    {
        sendMail(source);

    //    fs.writeFile("newIndex.html", source, function(err){
    //         if(err){
    //             return console.log(err);
    //         }

    //        console.log("the file was saved");
    //     })
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
        html: htmlBody

     
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