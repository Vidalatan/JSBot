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
async function _purge_(){
  console.log('Blackjack Purged');
  await Blackjack.deleteMany();
}

module.exports = {Blackjack, _purge_};