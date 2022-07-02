function generateId(players){
  var tmp = '';
  for(let i = 0; i < 20; i++){
    tmp += (players[0].user.slice(2,-1)[i] ?? Math.floor(Math.random()*10))+(players[1].user.slice(2,-1)[i] ?? Math.floor(Math.random()*10));
  }
  return tmp;
}

module.exports = { generateId }