function generateId(players){
  var tmp = '';
  for(let i = 0; i < players[0].user.slice(2,-1).length+5; i++){
    tmp += (players[0].user.slice(2,-1)[i] ?? Math.floor(Math.random()*10))+(players[1].user.slice(2,-1)[i] ?? Math.floor(Math.random()*10));
  }
  console.log(tmp);
  return tmp;
}

function parseGameId(gameId, players){
  return gameId
          .split('')
          .reduce((prev, curr, ind) => {
            prev[ind%players] = [...prev[ind%players], curr];
            return prev;
          }, [].constructor(players).fill([]))
          .map(set => set.join(''));
}

module.exports = { generateId }