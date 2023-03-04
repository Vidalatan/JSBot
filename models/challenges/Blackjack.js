const { Schema, model } = require('mongoose');
const { userSchema } = require('../User.js');

const blackjackSchema = new Schema(
  {
    gameId: {
      type: String,
      unique: true,
      required: true
    },
    deck: {
      type: Array,
      required: true
    },
    users:[{...userSchema.clone, unique:false}]
  }
);

const Blackjack = model('blackjack', blackjackSchema);
async function _purge_(){
  console.log('Blackjack Purged');
  await Blackjack.deleteMany();
}

module.exports = {Blackjack, _purge_};