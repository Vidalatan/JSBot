const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
  chg:'tst',
  play(ctx, target){
    const exampleEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Test Game')
      .setDescription(`${ctx.author} vs ${target} playing: testGame`)
      .addField('Test Number', '0', false)
    
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('cmdtst+1')
          .setLabel('+1')
          .setStyle('SUCCESS'),
        new MessageButton()
          .setCustomId('cmdtst-1')
          .setLabel('-1')
          .setStyle('DANGER'),
      )
    const row2 = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('cmdtst3')
          .setLabel('close')
          .setStyle('PRIMARY'),
        
      )

    ctx.channel.send({ embeds: [exampleEmbed], components: [row, row2]})
  },

  interaction(ctx){
    let newEmb;
    switch (ctx.customId.slice(6)) {
      case '+1':
        newEmb = new MessageEmbed(ctx.message.embeds[0])
          .setFields([{...ctx.message.embeds[0].fields[0], value:String(Number(ctx.message.embeds[0].fields[0].value)+1)}])
        break;
      case '-1':
        newEmb = new MessageEmbed(ctx.message.embeds[0])
          .setFields([{...ctx.message.embeds[0].fields[0], value:String(Number(ctx.message.embeds[0].fields[0].value)-1)}])
        break;
      default:
        ctx.message.delete()
        ctx.channel.send('Game closed');
        return;
    }
    
    ctx.update({
      embeds: [newEmb]
    })
  },
}