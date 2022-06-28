const commandList = require('./commands.js');

module.exports = {
  execute(ctx){
    const [cmd, ...args] = ctx.content.split(' ');
    if(cmd[0]==='_' && cmd.slice(-1)==='_') return
    for(let command in commandList){
      (command === cmd && commandList[cmd](ctx, ...args))
    }
  }
}