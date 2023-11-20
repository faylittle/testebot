const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const colors = require("../../utils/colors.js");

module.exports = async (client, ctx, nome, convite, cargo, pergunta, id) => {

  await client.guild.updateOne({ guildId: id }, { $set: { "data.pending": true, "data.logs_join.userId": ctx.user.id, "data.logs_join.date": Date.now(), "data.about.name": nome, "data.about.invite": convite } });

  return client.channels.cache.get("1139198836942839860").send({
    embeds: [
      new EmbedBuilder()
        .setAuthor({ name: `${ctx.user.username}`, iconURL: `${ctx.user.displayAvatarURL()}` })
        .setDescription(`# Nova solicitação!!`)
        .setColor(colors.primary)
        .addFields({
          name: "<:bluearrowright:1139156585512456233> Nome do Servidor:",
          value: `\`\`\`${nome}\`\`\``
        }, {
          name: "<:bluearrowright:1139156585512456233> ID do Servidor:",
          value: `\`${id}\``
        }, {
          name: "<:bluearrowright:1139156585512456233> Convite:",
          value: `${convite}`
        }, {
          name: "<:bluearrowright:1139156585512456233> Função/Cargo:",
          value: `\`\`\`${cargo}\`\`\``
        }, {
          name: "<:bluearrowright:1139156585512456233> Servidor faz parte de outra aliança:",
          value: `\`\`\`${pergunta}\`\`\``
        })
        .setImage("https://media.discordapp.net/attachments/1133047567702294567/1139160894526464030/image.png")
    ], components: [
      new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`aceit-${id}-${ctx.user.id}`)
          .setLabel("aprovar")
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId(`recus-${id}-${ctx.user.id}`)
          .setLabel("reprovar")
          .setStyle(ButtonStyle.Danger)
      )]

  });

}
