
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

  insult(ctx, target){
    const insults = 
    [
      "%target% is a Stinking Hoser",
      "%target% would get some bitches if they got rid of that yee-yee-ass hair cut",
      "%target% is a Facking Hoser",
      "Everyone keep clear of that idiot %target%",
      "I was today years old when I realized I didn't like %target%",
      "Someday %target%'ll go far. And I really hope they stay there",
      "I love what %target% has done with their hair. How do they get it to come out of their nostrils like that?",
      "%target% is the reason God created the middle finger",
      "%target% can bring such joy to a room. As long as they are leaving it",
      "Keep rolling your eyes %target%. You might eventually find a brain"
    ]
    ctx.channel.send(insults[Math.floor(Math.random()*insults.length)].replace('%target%', target??ctx.author))
    ctx.delete()
  },
  $insult:
  `Will either insult a given target, or the one who invoked the command.
  Examples:
    target with @: \`\`!!insult @{name#discriminator}\`\`
    target without @: \`\`!!insult {anything}\`\`
    no target: \`\`!!insult\`\``,

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