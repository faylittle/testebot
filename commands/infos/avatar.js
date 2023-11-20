const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const colors = require("../../utils/colors.js")

module.exports = {
  name: "avatar",
  description: "Ver o avatar do usuário",
  type: ApplicationCommandType.ChatInput,
  options: [{
    name: "usuário",
    description: "Ver avatar de outro usuário",
    type: ApplicationCommandOptionType.User
  }],
  run: (client, interaction) => {

    let user = interaction.options.getUser("usuário") || interaction.user;

    interaction.reply({
      content: `${interaction.user}`,
      embeds: [
        new EmbedBuilder()
          .setTitle("Avatar do Usuário!")
          .setColor(colors.primary)
          .setImage(user.displayAvatarURL({ dynamic: true, size: 2048 }))
          .setTimestamp()
      ],
      ephemeral: true
    });
  }
}
