const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType } = require("discord.js");
const colors = require("../../utils/colors.js");

module.exports = {
  name: "userinfo",
  description: "Ver informações do usuário",
  type: ApplicationCommandType.ChatInput,
  options: [{
    name: "usuário",
    description: "Ver avatar de outro usuário",
    type: ApplicationCommandOptionType.User,
    required: false
  }],
  run: (client, interaction) => {

    let user = interaction.options.getUser("usuário") || interaction.user;

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Sobre o Usuário!")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .addFields({
            name: "ID do Usuário:",
            value: `\`${user.id}\``
          }, {
            name: "Conta Criada:",
            value: `<t:${~~(user.createdTimestamp / 1000)}:D>`
          })
          .setColor(colors.primary)
      ],
      ephemeral: true
    })
  }
}
