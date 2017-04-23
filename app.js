const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
mongoose.Promise= global.Promise;
// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const app = express();

const users = require('./routes/users');
const products = require('./routes/products');
const carts = require('./routes/carts');
const vendor = require('./routes/vendor');
const orders = require('./routes/orders');
const vendorOrder = require('./routes/vendorOrder');
const coupons = require('./routes/coupons');
const profile = require('./routes/profile');
// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/products', products)
app.use('/carts',carts);
app.use('/vendor', vendor);
app.use('/orders', orders);
app.use('/vendorOrder', vendorOrder);
app.use('/coupons', coupons);
app.use('/profile',profile);
// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

//app.get('*', (req, res) => {
  //res.sendFile(path.join(__dirname, 'public/index.html'));
//});

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});
