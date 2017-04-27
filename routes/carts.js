const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const mongojs = require('mongojs');
const db = mongojs('mongodb://localhost:27017/liquidNitro');

var nodeMailer = require('nodemailer');


var recipient = '';




router.post('/invoice', function(req, res, next){

        
    var recipient = req.body.user.email; 
     var subjectTime = new Date();

    var n = new Date();
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();





    var htmlBody= 
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

    for (var index in req.body.product)
     {

            htmlBody += '<tr class="item"'
            + '</td>'
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

    htmlBody += '<tr class="total">'
            + '<td style="padding: 5px;vertical-align: top;">' + '</td>'
            + '<td style="padding: 5px;vertical-align: top;">' + '</td>'
            + '<td style="padding: 5px;vertical-align: top;">' + '</td>'
            + '<td style="padding: 5px;vertical-align: top;">' + '</td>'
            + '<td style="padding: 5px;vertical-align: top;border-top: 2px solid #eee;font-weight: bold;">'
            + "Subtotal Sum: " + "$" + req.body.subTotalSum + '<br>'
            + 'Discount: ' + "$" + req.body.couponAmount + '<br>'
            + 'Total: ' + "$" + req.body.totalSum
            + '</td>'
            + '</tr>'
            + '</table>'
            + '</div>'
            ;

   sendMail();

function sendMail() {
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
        subject: 'Testing - ',
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

module.exports = router;