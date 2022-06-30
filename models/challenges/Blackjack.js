const { Schema, model } = require('mongoose');
const User = require('../User.js')

const blackjackSchema = new Schema(
  {
    gameId: {
      type: Number,
      unique: true,
      required: true
    },
    users: [User]
  }
);

const Blackjack = model('blackjack', blackjackSchema);

module.exports = Blackjack;