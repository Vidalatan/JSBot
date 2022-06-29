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

    ctx.channel.send({ embeds: [exampleEmbed], components: [row]})
  },

  interaction(ctx){
    console.log(ctx.message.embeds[0].fields);
    // const newEmb = new MessageEmbed(ctx.message.embeds[0])
    //   .setFields([{...ctx.message.embeds[0].fields[0], name:'TestField Change'}])
    // let newEmb;
    // console.log(ctx.customId.slice(6))

    // switch (ctx.customId.slice(6)) {
    //   case '+1':
    //     newEmb = new MessageEmbed(ctx.message.embeds[0])
    //       .setFields([{...ctx.message.embeds[0].fields[0], value:String(Number(ctx.message.embeds[0].fields[0].value)+1)}])
    //     break;
    //   case '-1':
    //     newEmb = new MessageEmbed(ctx.message.embeds[0])
    //       .setFields([{...ctx.message.embeds[0].fields[0], value:String(Number(ctx.message.embeds[0].fields[0].value)-1)}])
    //     break;
    // }
    
    // ctx.update({
    //   embeds: [newEmb]
    // })
  },
}