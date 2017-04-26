const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const mongojs = require('mongojs');
const db = mongojs('mongodb://mlangi:123456789@ds163940.mlab.com:63940/liquidnitro');
const bcrypt = require('bcryptjs');

// Register
router.post('/register', (req, res, next) => {

  console.log("in Register USER");
  var newUser = new User(req.body);
  
  User.addUser(newUser, (err, user) => {
    if(err){
      console.log(err)
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });
  
});


//add customer
router.post('/newUser', function(req, res, next){
  var newUser = new User(req.body);

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  console.log("in profile user.js");
  res.json({user: req.user});
});

// Get customres
router.get('/users', function(req, res, next){
    db.users.find(function(err, users){
        if(err){
            res.send(err);
        }
        res.json(users);
    });
});


// Get Single customer
router.get('/user/:id', function(req, res, next){
    db.users.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);
    });
});


//remove customer
router.delete('/user/:id', function(req, res, next){
    db.users.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);
    });
});

router.post('/editpassword', function(req, res, next){


    User.comparePassword(req.body.password, req.body.user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
          
          User.hashPassword(req.body.newPass, (err, newpassword) => {
    if(err){
      res.json({success: false, msg:'Failed to hash password'});
    } else {
      res.json({success: true, msg:'password hashed'});     
       db.users.update({_id: mongojs.ObjectId(req.body.user._id)}, {username:req.body.user.username,
                                                                    fName:req.body.user.fName,
                                                                    lName: req.body.user.lName,
                                                                    bName: req.body.user.bName,
                                                                    pNum: req.body.user.pNum,
                                                                    mNum: req.body.user.mNum,
                                                                    fNum: req.body.user.fNum,
                                                                    region: req.body.user.region,
                                                                    address: req.body.address,
                                                                    city: req.body.user.city,
                                                                    state: req.body.user.state,
                                                                    zip: req.body.user.zip,
                                                                    password:newpassword,
                                                                    email:req.body.user.email,
                                                                    role: req.body.user.role
                                                                    });

    }
  });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
});


router.post('/edituser', function(req, res, next){
          
    var userPassword;
     
    db.users.findOne({_id:mongojs.ObjectId(req.body._id)},function(err,user){
      console.log(user.password);
      if (user.password != req.body.password){
        console.log("breaks here");
        User.hashPassword(req.body.password, (err, newpassword) => {
        if(err){
          console.log(err);
          res.json({success: false, msg:'Failed to hash password'});
        } 
        else {
          res.json({success: true, msg:'password hashed'}); 
              userPassword = newpassword;
              db.users.update({_id: mongojs.ObjectId(req.body._id)}, {username:req.body.username,
                                                                    fName:req.body.fName,
                                                                    lName: req.body.lName,
                                                                    bName: req.body.bName,
                                                                    pNum: req.body.pNum,
                                                                    mNum: req.body.mNum,
                                                                    fNum: req.body.fNum,
                                                                    region: req.body.region,
                                                                    address: req.body.address,
                                                                    city: req.body.city,
                                                                    state: req.body.state,
                                                                    zip: req.body.zip,
                                                                    password: userPassword,
                                                                    email:req.body.email,
                                                                    role: req.body.role
                                                                    });      
             }
          });
        }

      else if(user.password == req.body.password)
      {
       userPassword = req.body.password;
       db.users.update({_id: mongojs.ObjectId(req.body._id)}, {username:req.body.username,
                                                                    fName:req.body.fName,
                                                                    lName: req.body.lName,
                                                                    bName: req.body.bName,
                                                                    pNum: req.body.pNum,
                                                                    mNum: req.body.mNum,
                                                                    fNum: req.body.fNum,
                                                                    region: req.body.region,
                                                                    address: req.body.address,
                                                                    city: req.body.city,
                                                                    state: req.body.state,
                                                                    zip: req.body.zip,
                                                                    password: userPassword,
                                                                    email:req.body.email,
                                                                    role: req.body.role
                                                                    });
      }
        });   


    
    });


module.exports = router;

