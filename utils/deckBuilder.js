// Suits and Values of cards
const SUITS = ['♦️','♥️','♣️','♠️'];
const VALUES = 
[
  'A', 'J', 'Q',
  'K', '2', '3',
  '4', '5', '6',
  '7', '8', '9', '10'
]

// For each suit, create a {suit,value} pair and then flatten the array
const DECK = SUITS.flatMap(suit => {
  const set = []
  for(let value of VALUES){
    set.push({suit:suit, value:value})
  }
  return set
})

/**
 * Shuffles deck randomly and returns the shuffled deck.
 * @param {Array} deck Array of card values. Can be multiple decks, but must be flattened.
 * @returns Randomly shuffled deck.
 */
function shuffle(deck){
  let random, shuffler, index;
  for(index = deck.length - 1; index > 0; index--){
    random = Math.floor(Math.random() * (index+1));
    shuffler = deck[index];
    deck[index] = deck[random];
    deck[random] = shuffler;
  }
  return deck
}