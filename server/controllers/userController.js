const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name');
  req.checkBody('name', 'Please supply a name!').notEmpty();
  req.checkBody('email', 'Invalid Email!').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    gmail_remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req.checkBody('password', 'Password cannot be Blank!').notEmpty();
  req.checkBody('confirmPassword', 'Confirmed password cannot be blank!').notEmpty();
  req.checkBody('confirmPassword', 'Confirmed password do not match').equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    //console.log('error', errors.map(err => err.msg));
    res.json({"errorType": "validation", "errors": errors.map(err => err.msg)});
    return;
  }
  next();
};

exports.register = async (req, res, next) => {
  const user = new User({ email: req.body.email, name: req.body.name });
  const register = promisify(User.register, User);

  await register(user, req.body.password)
    .then(result => {
      //console.log('sucessssss', result);
    }, err => {
      res.send(err);
      return;
    });
  next(); 
};

exports.validateLogin = (req, res, next) => {
  req.checkBody('email', 'Invalid Email!').isEmail();
  req.checkBody('password', 'Password cannot be Blank!').notEmpty();
 
  const errors = req.validationErrors();
  if (errors) {
    //console.log('error', errors.map(err => err.msg));
    res.json({"errorType": "validation", "errors": errors.map(err => err.msg)});
    return;
  }
  next();
};

exports.validateForgotPassword = (req, res, next) => {
  console.log('in validateForgotPassword');
  req.checkBody('email', 'Invalid Email!').isEmail();
 
  const errors = req.validationErrors();
  if (errors) {
    //console.log('error', errors.map(err => err.msg));
    res.json({"errorType": "validation", "errors": errors.map(err => err.msg)});
    return;
  }
  next();
};