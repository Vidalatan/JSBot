require('dotenv').config();
const { Client, Intents } = require('discord.js');

const token = process.env.TOKEN;
const c = new Client({ intents: [Intents.FLAGS.GUILDS] });
const guilds = c.guilds.fetch()

c.on('ready', () => {
  console.log(`Logged in as ${c.user.tag}`);
  console.log(guilds);
});

c.login(token)