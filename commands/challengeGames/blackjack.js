const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { generateId } = require('../../utils/gameId.js')
const { User } = require('../../models/User.js')
const {Blackjack} = require('../../models/challenges/Blackjack.js');

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
const DECK = SUITS.flatMap(suit => VALUES.map(value => suit+value))

console.log(DECK);

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

/**
 * Creates a new array of combined decks depending on how many decks are wanted, then shuffles those together.
 * @param {number} number number of decks to 
 */
async function addDecks(number){
  let final = DECK;
  for(let index = 0; index < number-1; index++) final = [...final, ...DECK];
  final = shuffle(final);
  return final;
}

function createHand(isDealer=false){

}

module.exports = {
  chg:'blj',
  async play(ctx, target, ...options){
    // Determine if the user calling the command requested specific amount of extra decks to be used, if not default to 0.
    const decks = Number(options.filter(opts => {if(opts.includes('decks=')) return true})[0]?.slice(6))??0
    // If more than 5 decks are requested, reply with deck request limit.
    if(decks > 5){
      ctx.reply('Deck limit (5) exceeded. Please try again.');
      return;
    }
    const gameDeck = await addDecks(decks); // Combination of decks after they have been shuffled.
    const gameUsers = []; // List will be used to hold the requesting and challenged players
    let id; // Will be used to set the game Id                   
    try {
      // For each of the challenger and their target, either find their user in the DB or create a new user.
      for(let u of [ctx.author.id, target.slice(2,-1)]){
        const f = await User.findOne({user:`<@${u}>`})
        if(f){
          gameUsers.push(f)
        } else{
          gameUsers.push(await User.create({user:`<@${u}>`}))
        }
      }
      id = generateId(gameUsers)
      await Blackjack.create({gameId: id, deck:gameDeck, users: gameUsers})
    } catch (err) {
      console.error(err);
      ctx.reply({content: 'Either you or the target are already in a game...', ephemeral:true})
      return;
    }

    const bljEmb = new MessageEmbed()
      .setTitle('Blackjack')
      .setDescription(`Dealer: ??`)
      .addField('Deck', `${gameDeck.length}`, true)
      .setFooter({text:String(id)})
    
    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId('cmdbljhit')
        .setLabel('Hit')
        .setStyle('PRIMARY'),
      new MessageButton()
        .setCustomId('cmdbljstay')
        .setLabel('Stay')
        .setStyle('PRIMARY'),
      new MessageButton()
        .setCustomId('cmdbljforfeit')
        .setLabel('Forfeit')
        .setStyle('DANGER'),
      new MessageButton()
        .setCustomId('cmdbljtest')
        .setLabel('Test DB')
        .setStyle('SECONDARY'),
    )


    ctx.channel.send({embeds: [bljEmb], components: [row]})
  },

  async interaction(ctx){
    if(ctx.customId === 'cmdbljtest') {
      try {
        const foot = ctx.message.embeds[0].footer.text
        const usersData = await Blackjack.findOne({gameId: foot})
        const users = usersData.users.map( user => user.user)
        console.log(usersData);
        ctx.reply(`Testing DB. Successfully retrieved current players: ${users}
        Using gameid ${usersData.gameId} (found in the footer of the game)`)
      } catch (err) {
        console.log(err);
      }
    } else if(ctx.customId === 'cmdbljforfeit') {
      await User.deleteMany({})
      await Blackjack.deleteMany({})
      ctx.message.delete();
    }
  }
}