const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Please supply a name.',
    trim: true
  },
  slug: String,
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address.'],
    required: 'Please Supply an email address.'
  },
  gender: {
    type: String,
    required: 'Please specify gender.',
  }
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

userSchema.pre('save', async function(next) {
  if (!this.isModified('name')) {
    next();
    return;
  }
  this.slug = slug(this.name);
  next();
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
