const commandList = require('./commands.js');
const challenges = commandList._challenges

module.exports = {
  execute(ctx){
    const [cmd, ...args] = ctx.content.split(' ');
    if(cmd[0]==='_' && cmd.slice(-1)==='_') return
    try {
      commandList[cmd].e(ctx, ...args)
    } catch (err) {
      ctx.reply(`${cmd} does not exist`)
    }
  },

  interactionRouter(ctx){
    for(let challenge in challenges){
      if(ctx.customId.slice(3,6) === challenges[challenge].chg) challenges[challenge].interaction(ctx)
    }
  }
}