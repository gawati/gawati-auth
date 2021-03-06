var path = require('path');
var express = require('express');
var bodyParser = require("body-parser");
const expressValidator = require('express-validator');

var app = express();

app.use(express.static(path.join(__dirname, '../client/public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

app.use(expressValidator());

const routes = require('./routes/index');

app.use('/', routes);

module.exports = app;