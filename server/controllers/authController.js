const path = require('path');
const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail');

exports.login = (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.send('401'); }
    res.send(user);
  })(req, res, next);
};

exports.forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if(user) {
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
    await user.save();
    console.log('userrrr', user);

    var resetURL = `http://${req.headers.host}/reset-password/${user.resetPasswordToken}`;
  }
  console.log('in forgotPassword 1');
  await mail.send({
    user,
    resetURL: `http://${req.headers.host}/reset-password/${user.resetPasswordToken}`,
    filename: 'reset-email',
    subject: 'Gawati Password Reset',
    resetURL
  });
  console.log('in forgotPassword 2');
  res.send(['You have been emailed a password reset link.']);
};

exports.reset = async (req, res, next) => {
  console.log('reset', req.params.token);
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  });
  if (!user) {
    console.log('error', 'Password reset is invalid or has expired');
    res.send(['Password reset is invalid or has expired']);
    return;
  }
  console.log('user', user);
  res.render('reset-password', { token: req.params.token});
};

exports.confirmedPasswords = (req, res, next) => {
  req.checkBody('password', 'Password cannot be Blank!').notEmpty();
  req.checkBody('confirmPassword', 'Confirmed password cannot be blank!').notEmpty();
  req.checkBody('confirmPassword', 'Confirmed password do not match').equals(req.body.password);
  
  const errors = req.validationErrors();
  if (errors) {
    console.log('error', errors.map(err => err.msg));
    res.json({"errorType": "validation", "errors": errors.map(err => err.msg)});
  }

  if (req.body.password === req.body['confirmPassword']) {
    next();
  }
};

exports.update = async (req, res) => {
  console.log('updating', req.body)
  const user = await User.findOne({
    resetPasswordToken: req.body.token,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) {
    console.log('error', 'Password reset is invalid or has expired');
    return res.redirect('/login');
  }

  const setPassword = promisify(user.setPassword, user);
  await setPassword(req.body.password);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  const updatedUser = await user.save();
  //await req.login(updatedUser);
  console.log('success', 'Password has been reset! You are now logged in!');
  res.json({"success": true, "msg": 'Password has been reset! redirecting to login..'} );
};