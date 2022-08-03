// const { User } = require('./User.js');
// const { Blackjack } = require('./challenges/Blackjack.js')
const DBs = 
[
  require('../models/User.js'),
  require('../models/challenges/Blackjack.js')
]

function _purge_(){
  for(let db of DBs){
    db['_purge_']()
  }
}
module.exports = {_purge_}