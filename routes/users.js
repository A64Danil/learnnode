var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var validation = require('validator');

// Unclude User Model
var User = require('../models/user');
// Unclude User Model
var Student = require('../models/student');
// Unclude User Model
var Instructor = require('../models/instructor');

// User Register
router.get('/register', function(req, res, next) {
  console.log('router.get REGISTER');
  res.render('users/register');
  // res.send('respond with a resource');
});

// Register User
router.post('/register', function (req, res, next) {
  console.log('router.post REGISTER');
  // Get Form Values
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var street_address = req.body.street_address;
  var city = req.body.city;
  var state = req.body.state;
  var zip = req.body.zip;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;
  var type = req.body.type;

  // Form Validation
  var errors = [];
  if(validation.isEmpty(req.body.first_name)) errors.push({msg: "First name is empty. First name is requires."});
  if(validation.isEmpty(req.body.last_name)) errors.push({msg: "Last name is empty. Last name is requires."});
  if(validation.isEmpty(req.body.email)) errors.push({msg: "Email is empty. Email is requires."});
  if(!validation.isEmail(req.body.email)) errors.push({msg: "Email must be a valid email address."});
  if(validation.isEmpty(req.body.username)) errors.push({msg: "Username is empty. Username is requires."});
  if(validation.isEmpty(req.body.password)) errors.push({msg: "Password is empty. Password is requires."});
  if(validation.isEmpty(req.body.password2)) errors.push({msg: "Password2 is empty. Password2 is requires."});
  if(!validation.equals(req.body.password2, req.body.password)) errors.push({msg: "Passwords do not match."});


  if (errors.length > 0) {
    console.log('Errors');
    console.log(errors);
    res.render('users/register', {
      errors: errors
    });
  } else {
    var newUser = new User({
      email: email,
      username: username,
      password: password,
      type: type
    });

    if(type == 'student'){
      console.log('Registering Student');

      var newStudent = new Student({
        first_name: first_name,
        last_name: last_name,
        adress: [{
          street_address: street_address,
          city: city,
          state: state,
          zip: zip
        }],
        email: email,
        username: username
      });

      User.saveStudent(newUser, newStudent, function (err, user) {
        console.log('Student created')
      });
    } else {
      console.log('Registering Instructor');
      var newInstructor = new Штыекгсещк({
        first_name: first_name,
        last_name: last_name,
        adress: [{
          street_address: street_address,
          city: city,
          state: state,
          zip: zip
        }],
        email: email,
        username: username
      });

      User.saveInstructor(newUser, newInstructor, function (err, user) {
        console.log('Instructor created')
      });
    }

    req.flash('success', 'User Added');
    res.redirect('/');
  }
});

module.exports = router;
