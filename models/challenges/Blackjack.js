const { Schema, model } = require('mongoose');
const { userSchema } = require('../User.js')

const blackjackSchema = new Schema(
  {
    gameId: {
      type: Number,
      unique: true,
      required: true
    },
    users: [userSchema]
  }
);

const Blackjack = model('blackjack', blackjackSchema);

module.exports = Blackjack;