const {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  EmbedBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder
} = require("discord.js");

module.exports = {
  name: "embed",
  description: "Publique seu jornal",
  type: ApplicationCommandType.ChatInput,
  options: [{
    name: "titulo",
    description: "Qual o titulo da postagem",
    type: ApplicationCommandOptionType.String,
    required: true
  }, {
    name: "conteudo",
    description: "Qual a mensagem da postagem",
    type: ApplicationCommandOptionType.String,
    required: true
  }, {
    name: "imagem",
    description: "Insira uma imagem para a postagem",
    type: ApplicationCommandOptionType.Attachment,
    required: false
  }],
  run: async (client, interaction) => {
    if (["1089913259332739156"].some(x => interaction.user.id === x)) {

      const texto = interaction.options.getString("titulo");
      const desc = interaction.options.getString("conteudo");
      let img = interaction.options.getAttachment("imagem");
      if (!img) img = "off";
      let emb = new EmbedBuilder()
        .setTitle(texto)
        .setColor("#ffffff")
        .setDescription(desc.replaceAll("<pula>", "\n\n"))
      if (img !== "off") emb.setImage(img.url);
      if (interaction.channel.name.includes("ticket")) client.channels.cache.get("1060984066792509620").send({
        embeds: [emb],
        components: [
          new ActionRowBuilder()
            .addComponents(
              new StringSelectMenuBuilder()
                .setCustomId('createticket-1060982668394770623')
                .setPlaceholder('Selecione')
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions(
                  new StringSelectMenuOptionBuilder()
                    .setLabel('Patrocínio')
                    .setEmoji("🎁")
                    .setDescription('Solicite um patrocínio')
                    .setValue('patrocínio-1060982668394770623-1095759170130681906'),
                  new StringSelectMenuOptionBuilder()
                    .setLabel('Denúncias')
                    .setEmoji("🚓")
                    .setDescription('Faça uma denúncia')
                    .setValue('denuncias-1060982668394770623-1095759170130681906'),
                  new StringSelectMenuOptionBuilder()
                    .setLabel('Cargos')
                    .setEmoji("🔰")
                    .setDescription('Resgate de cargo ou adquir vips')
                    .setValue('cargos-1060982668394770623-1095759170130681906'),
                  new StringSelectMenuOptionBuilder()
                    .setLabel('Parceria')
                    .setEmoji("🤝")
                    .setDescription('Realize parceria com vossa comunidade')
                    .setValue('parceria-1060982668394770623-1116048726641868992'),
                )
            )
        ], fetchReply: true
      });
      interaction.reply({ ephemeral: true, content: "Ok!" });
    }
  }
}
