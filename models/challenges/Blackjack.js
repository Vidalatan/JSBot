const { Schema, model } = require('mongoose');
const { userSchema } = require('../User.js')

const cardSchema = new Schema(
  {
    suit: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  }
)

const blackjackSchema = new Schema(
  {
    gameId: {
      type: String,
      unique: true,
      required: true
    },
    deck: [cardSchema],
    users: [userSchema]
  }
);

const Blackjack = model('blackjack', blackjackSchema);
async function _purge_(){
  console.log('Blackjack Purged');
  await Blackjack.deleteMany();
}

module.exports = {Blackjack, _purge_};