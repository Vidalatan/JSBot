const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    user: {
      type: String,
      unique: true,
      required: true
    },
  }
);

const User = model('user', userSchema);

module.exports = User;