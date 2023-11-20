const {
  ActionRowBuilder,
  EmbedBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ChannelType,
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField
} = require("discord.js");

module.exports = async (client, i) => {
  await i.deferUpdate();

  const input = i.values[0];

  await i.guild.channels.fetch();

  if (i.guild.channels.cache.some(channel => channel.name === `${input}-${i.user.username}`)) return i.followUp({ content: ":x: Você já possui um ticket aberto nessa categoria!" })
  const db = await client.db.findOne({ ticketId: `${input.split("-")[0]}` });
  if (!db) return i.followUp({ content: ":x: Dados ausentes!", ephemeral: true });
  await i.guild.channels.create({
    name: `${input.split("-")[0]}-${i.user.username}`,
    type: ChannelType.GuildText,
    reason: `${i.user.id}`,
    parent: `${input.split("-")[1]}`,
    permissionOverwrites: [{
      id: i.guild.roles.everyone.id,
      deny: [PermissionsBitField.Flags.ViewChannel]
    }, {
      id: i.user.id,
      allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.AttachFiles],
      deny: [PermissionsBitField.Flags.MentionEveryone, PermissionsBitField.Flags.CreatePrivateThreads, PermissionsBitField.Flags.CreatePublicThreads, , PermissionsBitField.Flags.UseApplicationCommands]
    }, {
      id: `${input.split("-")[2]}`,
      allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
    }]
  }).then(channel => {
    
    if (input.split("-")[0] === "denuncias") {
      channel.permissionOverwrites.create("1083444880518434948", { ViewChannel: true, SendMessages: true }).catch(() => { return; });
      channel.permissionOverwrites.create("1083444022154117191", { ViewChannel: true, SendMessages: true }).catch(() => { return; });
    }
      
    channel.send({
      content: `${i.user}, ${db.ticket.message}`,
      embeds: [
        new EmbedBuilder()
          .setTitle("📩 | ATENTIMENTO!")
          .setColor("#2b2d30")
          .setThumbnail(i.user.displayAvatarURL({ dynamic: true }))
          .setDescription(`${db.ticket.description}.\n- __Categoria__: **${input.split("-")[0]}**`)
      ],
      components: [
        new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId("closed-ticket")
              .setLabel("Fechar o ticket")
              .setEmoji("🔒")
              .setStyle(ButtonStyle.Danger)
          )
      ]
    });
    return i.followUp({ content: `📩 **|** ${i.user}, O seu ticket foi aberto em **${channel}!`, ephemeral: true });
  });
}
