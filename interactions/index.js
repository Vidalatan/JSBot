const interactions = require('./interactions.js')

module.exports = {
  routeInteraction(ctx){
    for(let interaction in interactions){
      console.log(interaction);
    }
  }
}