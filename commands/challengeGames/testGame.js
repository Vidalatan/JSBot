const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
  testGame(ctx, target){
    const exampleEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Test Game')
      .setDescription(`${ctx.author} vs ${target} playing: testGame`)
      .addField('Board', 'game element stuff down here... blah blah', false)
    
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('testButton1')
          .setLabel('Test Button')
          .setStyle('PRIMARY'),
        new MessageButton()
          .setCustomId('testButton2')
          .setLabel('Test Button')
          .setStyle('DANGER'),
        // new MessageButton()
        //   .setCustomId('testButton3')
        //   .setLabel('Test Button')
        //   .setStyle('LINK'),
        new MessageButton()
          .setCustomId('testButton4')
          .setLabel('Test Button')
          .setStyle('SECONDARY'),
        new MessageButton()
          .setCustomId('testButton5')
          .setLabel('Test Button')
          .setStyle('SUCCESS'),
      )

    ctx.channel.send({ embeds: [exampleEmbed], components: [row]})
  },

  btnHandler(ctx){
    return
  }
  
}