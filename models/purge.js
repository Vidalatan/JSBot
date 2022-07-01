// const { User } = require('./User.js');
// const { Blackjack } = require('./challenges/Blackjack.js')
const DBs = 
[
  require('./User.js'),
  require('./challenges/Blackjack.js')
]

function _purge_(){
  for(let db of DBs){
    console.log(db);
    db['_purge_']()
  }
}
module.exports = {_purge_}