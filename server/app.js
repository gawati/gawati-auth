var path = require('path');
var fs = require('fs');
var express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var bodyParser = require("body-parser");
const passport = require('passport');
const promisify = require('es6-promisify');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');

require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('connected to database:', process.env.DATABASE);
  console.log('waiting for requests...');
});


require('./models/User');
const routes = require('./routes/index');
require('./handlers/passport');

var app = express();

app.set('view engine', 'html');
app.engine('html', function (path, options, callbacks) {
  fs.readFile(path, 'utf-8', callback);
});

app.use(express.static(path.join(__dirname, '../client')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

app.use(expressValidator());

app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

app.use('/', routes);

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
});

module.exports = app;