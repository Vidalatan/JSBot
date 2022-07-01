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
function _purge_(){
  Blackjack.deleteMany({});
}

module.exports = {Blackjack, _purge_};