
/* 
  All commands require a 'ctx' argument to represent the context of the message/command sent.

  Each command should follow this structure:
    -docstring (optional)
    -function(ctx, [...args]),
    -$helper: {string}
*/
module.exports = {

  /**
   * Test command 
   */
  ping(ctx){
    ctx.reply('pong')
  },
  $ping:'Replies directly with \'ping\'',

  /**
   * Will loop through and match to anything prepended with '$' and the name of the command.
   * Format of adding a command helper is to declare the command helper underneath the 
   * command.
   * @param {string} command command that should be searched for
   */
  help(ctx, command){
    for(let helper in this){
      if(helper[0] === '$' && helper.slice(1) === command){
        ctx.reply(this[helper])
        return
      }
    }
    ctx.reply(`No command called ${command} was found.`)
  },
  $help: 
  `Will look for valid matching command.
  Example:\`\` !!help {command} \`\``

}