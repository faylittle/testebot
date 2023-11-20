const {
  Events,
  ChannelType,
  InteractionType
} = require("discord.js");
const client = require("../../index.js");
module.exports = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction) {
    if (!interaction.guild || interaction.user.bot === true) return;
    if (interaction.channel.type === ChannelType.DM) return;
    if (interaction.type === InteractionType.ApplicationCommand) {
      const cmd = client.commands.get(interaction.commandName);
      if (!cmd) return interaction.reply({ content: `Falha em executar esse comando!`, ephemeral: true });
      interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);
      cmd.run(client, interaction);
    }
    if (interaction.isStringSelectMenu()) {
      if (interaction.customId.startsWith("createticket")) {
        return require("../../utils/ticket/create")(client, interaction);
      } else {
        return interaction.reply({ content: ":x: Nenhuma ação programada!", ephemeral: true });
      }
    } else if (interaction.isButton()) {
      if (interaction.customId.startsWith("closed-ticket")) {
        return require("../../utils/ticket/delete")(client, interaction);
      } else {
        return interaction.reply({ content: ":x: Nenhuma ação programada!", ephemeral: true });
      }
    }
  }
}
