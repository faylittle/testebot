const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

module.exports = async (client, interaction, id, userId) => {

  const guilddb = await client.guild.findOne({ guildId: id })
  if (!guilddb) return interaction.reply({ ephemeral: true, content: `:x: | ${interaction.user}, falha com meus dados!` })

  await interaction.reply({ content: `📝 | ${interaction.user} está analisando servidor \`${guilddb.data.about.name}\`!`, ephemeral: true }).catch(() => { return; });

  await interaction.message.edit({
    content: `# ⭐ ${interaction.user} **|** Selecione uma **divisão** para esse servidor no menu de seleção abaixo!`,
    embeds: [],
    components: []
  }).then(msg => {

    msg.edit({
      components: [
        new ActionRowBuilder().addComponents(
          new StringSelectMenuBuilder()
            .setCustomId("selectgroup")
            .setPlaceholder("Selecione uma divisão")
            .addOptions(
              new StringSelectMenuOptionBuilder()
                .setLabel("tronos")
                .setDescription("setar")
                .setEmoji("<a:blueflame:1139146924876890163>")
                .setValue("tronos-0"),
              new StringSelectMenuOptionBuilder()
                .setLabel("anjos")
                .setDescription("setar")
                .setEmoji("<a:blueflame:1139146924876890163>")
                .setValue("anjos-1"),
              new StringSelectMenuOptionBuilder()
                .setLabel("querubins")
                .setDescription("setar")
                .setEmoji("<a:blueflame:1139146924876890163>")
                .setValue("querubins-2"),
              new StringSelectMenuOptionBuilder()
                .setLabel("serafins")
                .setDescription("setar")
                .setEmoji("<a:blueflame:1139146924876890163>")
                .setValue("serafins-3"),
              new StringSelectMenuOptionBuilder()
                .setLabel("arcanjos")
                .setDescription("setar")
                .setEmoji("<a:blueflame:1139146924876890163>")
                .setValue("arcanjos-4")
            ))]
    });

    const collector = msg.createMessageComponentCollector({ time: 180000 });//3500

    collector.on('collect', async i => {
      await i.deferUpdate();
      let options = i.values[0];
      collector.stop();
      if (i.customId === "selectgroup") {
        msg.edit({ content: `# 📬 __Logs do Registro__!\n- Registrador: ${interaction.user}-\`${interaction.user.id}\`\n- Servidor: \`${guilddb.data.about.name}\`-\`${id}\`\n- Representante: <@${guilddb.data.logs_join.userId}>-\`${guilddb.data.logs_join.userId}\``, components: [] });

        await client.guild.updateOne({ guildId: id }, { $set: { "data.pending": false, "data.verified": true, "data.logs_verified.userId": i.user.id, "data.logs_verified.date": Date.now(), "data.logs_verified.group": options.split("-")[0], } });

        i.followUp({
          ephemeral: true,
          content: `✅ | ${i.user}, você adicionou o servidor na divisão: \`${options}\``
        });
        const membro = interaction.guild.members.cache.get(userId);
        if (!membro) return;
        let roles = ["1130955625535381584", "1130958570146513009", "1124533957678092398", "1123262276103843901", "1130955640341274655"];//options.split("-")[0]
        if (membro.roles.cache.has(`${roles[options.split("-")[1]]}`) === false) {
          await membro.roles.add(`${roles[options.split("-")[1]]}`).catch(() => { return; })
        }
      }
    });

    collector.on('end', (collected, reason) => {
      if (reason && reason === "time") {
        msg.edit({ components: [] });
      }
    });
  });
}
