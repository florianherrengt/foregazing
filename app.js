//require('dotenv').config();
var express = require('express')
var app = express()
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }), bodyParser.json());

app.post('/', function (req, res) {
    res.send(process.env)
})

module.exports = app;

