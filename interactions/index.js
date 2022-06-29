const interactions = require('./interactions.js')

module.exports = {
  routeInteraction(ctx){
    for(let interaction in interactions){
      if(ctx.customId.slice(0, 3) === interactions[interaction].route) interactions[interaction].send(ctx)
    }
  }
}