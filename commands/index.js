const commandList = require('./commands.js')

module.exports = {
  execute(ctx){
    const [cmd, ...args] = ctx.content.split(' ');
    console.log(cmd, args);
    for(let command in commandList){
      (command === cmd && commandList[cmd](ctx, ...args))
    }
  }
}