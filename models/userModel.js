const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide your email'],
    lowercase: true
    // validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password']
    // validate: {
    //   // This only works on CREATE and on SAVE!!!
    //   validator: function(el) {
    //     return el === this.password;
    //   },
    //   message: 'Passwords are not the same'
    // }
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
