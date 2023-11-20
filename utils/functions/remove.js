module.exports = async (client, interaction, id) => {

  interaction.message.edit({
    content: `📢 **|** ${interaction.user}, a solicitação de participar na aliança foi **reprovada** com sucesso!`,
    embeds: [],
    components: []
  });

  await client.guild.findOneAndDelete({ guildId: id });

  interaction.reply({ ephemeral: true, content: `:bookmark_tabs: | ${interaction.user}, todos os dados de registro desse servidor foram apagados!` });

}