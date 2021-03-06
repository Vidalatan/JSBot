require('dotenv').config();
const db = require('./dbconfig/connection.js')
const { Client, Intents } = require('discord.js');
const { prefix } = require('./config.json')
const COMMANDS = require('./commands/index.js');
const INTERACTIONS = require('./interactions/index.js')

const token = process.env.TOKEN;
const c = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

c.once('ready', () => {
  console.log(`Logged in as ${c.user.tag}`);
  ME = c.user.id; // Easier access to client id
});

c.on('messageCreate', m => {
  if(m.author.id === ME) return
  if(m.content.slice(0,prefix.length) === prefix){
    m.content = m.content.slice(prefix.length).toLowerCase();
    m.ME = c;
    COMMANDS.execute(m)
  }
});

c.on('interactionCreate', i => {
  if(!i.isButton()) return;
  INTERACTIONS.routeInteraction(i)
})

c.login(token)