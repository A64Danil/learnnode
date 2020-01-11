var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var Firebase = require('firebase');
var fbRef = new Firebase('https://mmmmmmmusic.firebaseapp.com');

// Route Files

var routes = require('./routes/index');
var albums = require('./routes/albums');
var genres = require('./routes/genres');
var users = require('./routes/users');

// Init App
var app = express();

// lOGGER
app.use(logger('dev'));

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

// Handle Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));
