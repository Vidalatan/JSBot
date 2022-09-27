const VAL = [...Array(36)].map((_, i) => i < 10 ? i : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[i-10])

function generateId(players){
  var tmp = '';
  for(let i = 0; i < players[0].user.slice(2,-1).length+5; i++){
    tmp += (players[0].user.slice(2,-1)[i] ?? Math.floor(Math.random()*10))+(players[1].user.slice(2,-1)[i] ?? Math.floor(Math.random()*10));
  }
  console.log(tmp);
  return encode(tmp);
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

function encode(dec) {
  const chunks = dec.split('').reduce((p, c, i) => {
    p[Math.floor(i/16)] = [...p[Math.floor(i/16)], c]
    return p
  }, Array(Math.ceil(dec.length/16)).fill([]))
  return chunks.map((seg) => {
    seg = Number(seg.join(''))
    const het = [];
    do {
      seg /= 36;
      het.unshift(VAL[Math.round((seg-Math.floor(seg))*36)]);
      seg = Math.floor(seg);
    } while (seg > 0);
    return het.join('')
  }).join(' ')
}

function decode(het) {

}

module.exports = { generateId }