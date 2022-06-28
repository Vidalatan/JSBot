require('dotenv').config();
const { Client, Intents } = require('discord.js');

const COMMANDS = require('./commands/index.js')
const prefix = '!!'

const token = process.env.TOKEN;
const c = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

c.once('ready', () => {
  console.log(`Logged in as ${c.user.tag}`);
  ME = c.user.id; // Easier access to client id
});

c.on('messageCreate', (m) => {
  if(m.author.id === ME) return
  (m.content.slice(0,prefix.length) === prefix && COMMANDS.execute(m, m.content.slice(prefix.length)))
})

c.login(token)