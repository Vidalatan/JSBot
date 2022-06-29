const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const SUITS = ['♦️','♥️','♣️','♠️'];
const VALUES = 
[
  'A', 'J', 'Q', 'K',
  '1', '2', '3', '4',
  '5', '6', '7', '8',
  '9', '10'
]

const DECK = SUITS.flatMap(suit => {
  const set = []
  for(let value of VALUES){
    set.push(value+suit)
  }
  return set
})

function shuffle(){
  
}

function createHand(isDealer=false){
  
}

module.exports = {
  chg:'blj',
  play(ctx, target){
    console.log(DECK);
    const bljEmb = new MessageEmbed()
      .setTitle('Blackjack')
      .setDescription(`Dealer: ??`)
      .addField('Deck', `${DECK}`, true)

    ctx.channel.send({embeds: [bljEmb]})
  },

  interaction(ctx){

  }
}