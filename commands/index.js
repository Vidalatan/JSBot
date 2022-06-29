const commandList = require('./commands.js');
const challenges = commandList.challenges

module.exports = {
  execute(ctx){
    const [cmd, ...args] = ctx.content.split(' ');
    if(cmd[0]==='_' && cmd.slice(-1)==='_') return
    for(let command in commandList){
      (command === cmd && commandList[cmd].e(ctx, ...args))
    }
  },

  interactionRouter(ctx){
    for(let challenge in challenges){
      if(ctx.customId.slice(3,7) === challenges[challenge].chg) challenges[challenge].interaction(ctx)
    }
  }
}