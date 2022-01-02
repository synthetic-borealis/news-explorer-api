const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isValidEmail } = require('../utils/validation-helpers');
const BadCredentialsError = require('../errors/bad-credentials-err');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isValidEmail(v),
      message: 'Invalid e-mail address',
    },
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new BadCredentialsError();
      }

      return bcrypt.compare(password, user.password)
        .then((res) => {
          if (!res) {
            throw new BadCredentialsError();
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
