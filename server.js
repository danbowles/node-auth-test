var express = require('express');
var app = express();

var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var database = require('./config/database');

// Configuration
database.connect();
	// passport

// Setup express
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'jade');

// Setup Passport
app.use(session({ secret: 'derp' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
require('./app/routes')(app, passport);

// Start
app.listen(3000);
console.log('Port ' + 3000 + ' is where it\'s at!');