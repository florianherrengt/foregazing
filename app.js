//require('dotenv').config();
var express = require('express')
var app = express()
var bodyParser = require('body-parser');

var getReport = require('./getReport');

app.use(bodyParser.urlencoded({ extended: true }), bodyParser.json());

app.post('/', getReport)

module.exports = app;

