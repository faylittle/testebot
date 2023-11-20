const Discord = require("discord.js");
const util = require("util");

module.exports = {
    name: "eval",
    description: "Comando para testes",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [{
        name: "script",
        type: Discord.ApplicationCommandOptionType.String,
        description: "Codigo a ser executado?",
        required: true,
    }],
    run: async (client, interaction) => {
        if (interaction.user.id !== "1027989059198537728") return interaction.reply({ content: `Esse comando deve ser utilizado somente pelas pessoas que estão me programando!`, ephemeral: true });

        const expression = interaction.options.getString("script");
        const resultEmbed = new Discord.EmbedBuilder();
        const inputEmbed = new Discord.EmbedBuilder();

        inputEmbed.setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` })
        inputEmbed.setTitle("Executar:")
        inputEmbed.setColor("#ffb6c1");
        inputEmbed.setFooter({ text: "Eval 🌸", iconURL: `${client.user.displayAvatarURL()}` })
        // await interaction.guild.members.fetch();
        inputEmbed.setDescription(`${Discord.codeBlock("js", expression)}`);

        try {

            code = await eval(expression)
            const result = util.inspect(code, { depth: 0 });
            //const result = util.inspect(eval(expression));

            if (result.length > 4096) {

                resultEmbed.setTitle("Vish.. Deu errado! 😭");
                resultEmbed.setColor("#ff6347");
                resultEmbed.setDescription("\> O resultado ultrapassou o limite de **4096 caracteres**. *Por esse motivo não pode ser exibido.*");

            } else {
                resultEmbed.setTitle("Saida:");
                resultEmbed.setColor("#2a2d30");
                resultEmbed.setDescription(`${Discord.codeBlock("js", result)}`);
            }

            interaction.reply({
                embeds: [inputEmbed, resultEmbed],
                ephemeral: true,
            });

        } catch (err) {

            resultEmbed.setTitle("Vish.. Algo deu errado! 😭");
            resultEmbed.setColor("#ff6347")
            resultEmbed.setDescription(`${Discord.codeBlock("js", err)}`);
            interaction.reply({
                embeds: [inputEmbed, resultEmbed],
                ephemeral: true,
            });
        }
    }
}