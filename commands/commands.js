const config = require('../config.json')
const { blackjack } = require('./challengeGames/blackjack.js')
const { holdem } = require('./challengeGames/holdem.js')
const { testGame } = require('./challengeGames/testGame.js')

/* 
  All commands require a 'ctx' argument to represent the context of the message/command sent.
  @param ctx is omitted from all docstrings to prevent redundancy.

  Here, ctx will always represent a Message object. 
  Documentation: https://discord.js.org/#/docs/discord.js/stable/class/Message

  Each command should follow this structure:
    {name}:{
      helper:'{Description of command for user}',
      **
      docstring (optional)
      *
      e(ctx, ...args){
        //do something here
      }
    },
*/
module.exports = {

  ping:{
    helper:
    `Replies directly with \'pong\'

    Example: \`\`${config.prefix}ping\`\``,
    /**
     * Test command that will reply to the user with 'pong'
     * @reply Replies 'pong'
     */
    e(ctx){
      ctx.reply('pong')
    },
  },

  insult:{
    helper:
    `Will either insult a given target, or the one who invoked the command.

    Examples:
      target with @: \`\`${config.prefix}insult @{name#discriminator}\`\`
      target without @: \`\`${config.prefix}insult {anything}\`\`
      no target: \`\`${config.prefix}insult\`\``,

    /**
     * Will randomly select an insult string from the array and replace any 
     * '%target%' portion of the string with the actual target argument. If no 
     * target was entered, then the target used will be the original message author
     * @param {string | mention} target Target for the command to insult
     * @send Sends randomly selected insult with target replaced in the string
     */
    e(ctx, target){
      const insults = 
      [
        "%target% is a Stinking Hoser",
        "%target% would get some bitches if they got rid of that yee-yee-ass hair cut",
        "%target% is a Facking Hoser",
        "Everyone keep clear of that idiot %target%",
        "I was today years old when I realized I didn't like %target%",
        "Someday %target%'ll go far. And I really hope they stay there",
        "I love what %target% has done with their hair. How do they get it to come out of their nostrils like that?",
        "%target% is the reason God created the middle finger",
        "%target% can bring such joy to a room. As long as they are leaving it",
        "Keep rolling your eyes %target%. You might eventually find a brain"
      ]
      ctx.channel.send(insults[Math.floor(Math.random()*insults.length)].replace('%target%', target??ctx.author))
      ctx.delete()
    },
  },
  
  roll:{
    helper:
    `Rolls dice according to the standard dice formula (nDs).
    'n' is the number of dice you wish to roll.
    's' is the number of sides each dice should have.

    Example: \`\`${config.prefix}roll 2d10\`\``,

    /**
     * Take standard dice formala as argument and calculate a random number. Send that number 
     * back into the chat where the command was originally invoked.
     * @param {string} formula Formula used to determine dice roll. Will always be
     * formated as such: nDs where n is the number of dice, and s is the number 
     * of sides for each dice.
     * @send Sends final dice result, as well as all subsequent dice rolls
     */
    e(ctx, formula){
      let n;
      let s;
      let roll = [];
      let final;
      if(formula){
        n = formula.slice(0, formula.toLowerCase().indexOf('d'));
        s = formula.slice(formula.toLowerCase().indexOf('d')+1);
      } else {
        n = 1;
        s = 6;
      }
      for(let i = 0; i < n; i++){
        roll.push(Math.floor(Math.random()*s)+1)
      }
      final = roll.reduce((a, b) => a+b), 0
      ctx.channel.send(`You rolled a: ${final}
      (${roll})`);
    },
  },

  challenge:{
    helper:'',

    e(ctx, target, game=''){
      if(ctx.mentions.users?.first()?.id === target.slice(2,-1)) {
        switch (game.toLowerCase()) {
          case 'blackjack':
            blackjack(ctx, target)
            return;
          case 'holdem':
            holdem(ctx, target)
            return;
          case 'testgame':
            testGame(ctx, target)
            return;
        }
      }
      ctx.channel.send('Either there the person you challenged or the game you requested doesn\'t exist.')
    }
  },

  commandlist:{
    helper:
    `Replies to the user with the list of all commands and their descriptions.
    
    Example: \`\`${config.prefix}commandlist\`\``,

    /**
     * Loops through all of the properties in this export object and appends them to 
     * the cmdList string formatted as to show the name in caps and the helper description 
     * underneath.
     * @reply List of commands and their descriptions
     */
    e(ctx){
      let cmdList='Here is a list of all the available commands (commands are not case sensitive):\n'
      for(let command in this.parent){
          cmdList += 
          `\`\`\`\n`+
          `${command.toUpperCase()}:\n\n`+
          `\t${this.parent[command]['helper']}\n`+
          `\`\`\`\n`
      }
      ctx.reply(cmdList)
    }
  },

  help:{
    helper:
    `Will look for valid matching command.

    Example:\`\` ${config.prefix}help {command} \`\``,
    
    /**
     * Loops though all commands in the list and matches it to the command 
     * parameter, then returns that string as a message to the user's channel.
     * @param {string} cmd command that should be searched for
     * @reply Either the helper description for that command, or a message 
     * stating no command was found.
     */
    e(ctx, cmd){
      for(let command in this.parent){
        if(command === cmd) {
          ctx.reply(this.parent[command]['helper'])
          return
        }
      }
      ctx.reply(`No command called ${cmd} was found.`)
    }
  },

  // Appends refrence to the exports object
  _init_: function(){
    this.help.parent = this;
    this.commandlist.parent = this;
    delete this._init_;
    return this;
  }
}._init_()