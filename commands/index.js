const commandList = require('./commands.js')

module.exports = {
  execute(ctx, cmd){
    for(let command in commandList){
      if(command === cmd) commandList[x](ctx)
    }
  }
}