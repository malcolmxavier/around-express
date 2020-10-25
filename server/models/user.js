const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        const URLRegex = /^(http|https):\/\/(www\.)?[a-z0-9\-/.]+/gi;
        return URLRegex.test(v);
      },
      message: 'Invalid URL',
    },
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
