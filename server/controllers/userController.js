var path = require('path');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name');
  req.checkBody('name', 'Please must supply a name!').notEmpty();
  req.checkBody('email', 'Invalid Email!').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    gmail_remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req.checkBody('password', 'Password Cannot be Blank!').notEmpty();
  req.checkBody('confirmPassword', 'Confirmed Password cannot be blank!').notEmpty();
  req.checkBody('confirmPassword', 'Your passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    console.log('error', errors.map(err => err.msg));
    res.send(errors);
    return;
  }
  next();
};

exports.register = async (req, res, next) => {
  const user = new User({ email: req.body.email, name: req.body.name });
  const register = promisify(User.register, User);
  await register(user, req.body.password);
  next(); 
};

exports.validateLogin = (req, res, next) => {
  console.log('-----------------------------------');
  req.checkBody('email', 'Invalid Email!').isEmail();
  req.checkBody('password', 'Password Cannot be Blank!').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    console.log('error', errors.map(err => err.msg));
    res.send(errors);
    return;
  }
  next();
};
