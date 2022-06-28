module.exports = {

  ping(ctx){
    ctx.reply('pong')
  },

  logThis(ctx){
    console.log(this); // returns this export object
  },

  testArgs(ctx, arg1, arg2, arg3){
    ctx.reply(`arg1:${arg1}, arg2:${arg2}, arg3:${arg3}`)
  }

}