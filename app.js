var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')

const mongo_url = "mongodb://taskmanager:R4Z3p0ErmaK_@localhost:27017/taskmanager"

var apiRouter = require('./routes/api');

var app = express();

mongoose.Promise = global.Promise

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect(mongo_url)
    .catch(err => console.log(`Ou fak mazafaka error: ${err}`))
    .then(() => console.log("Vse ok"))

app.use('/api', apiRouter);

module.exports = app;
