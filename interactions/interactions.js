const COMMANDS = require('../commands/index.js')

module.exports = {
  challenge:{
    route:'cmd',
    send(ctx){
      COMMANDS.interactionRouter(ctx)
    }
  }
}