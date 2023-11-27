var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var passport = require('passport')
require('dotenv').config()

require('./config/auth')

var apiRouter = require('./routes/api/familyApi');

var app = express();

mongoose.Promise = global.Promise

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/family', apiRouter)

mongoose.connect(process.env.MONGO_URL)
    .catch(err => console.log(`Ou fak mazafaka error: ${err}`))
    .then(() => console.log("Vse ok"))

module.exports = app;
