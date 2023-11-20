const { ApplicationCommandType, ApplicationCommandOptionType } = require("discord.js");
const colors = require("../../utils/colors.js");

module.exports = {
    name: "8ball",
    description: "Ver informações de registro aliança",
    type: ApplicationCommandType.ChatInput,
    options: [{
        name: "pergunta",
        description: "Informe sua pergunta",
        type: ApplicationCommandOptionType.String,
        required: true
    }],
    run: async (client, interaction) => {

        const question = interaction.options.getString("pergunta")

        const choices = [
            "É certo.",
            "Toma no ku.",
            "Sem dúvida.",
            "Sim definitivamente.",
            "Como vou saber.",
            "A meu ver, sim.",
            "Provavelmente.",
            "Perspectivas boas.",
            "Sim.",
            "Sinais apontam que sim.",
            "Responder nebuloso, tente novamente.",
            "Pergunte novamente mais tarde.",
            "Melhor não te dizer agora.",
            "Não é possível prever agora.",
            "Concentre-se e pergunte novamente.",
            "Não conte com isso.",
            "Minha resposta é não.",
            "Minhas fontes dizem não.",
            "Não boto fé.",
            "Muito duvidoso."
        ];

        interaction.reply({ content: "loanding..", ephemeral: true }).catch(() => { return; });
        const ball = Math.floor(Math.random() * choices.length);

        try {

            await interaction.channel.createWebhook({
                name: '.rimuru_san saiadinho 💪',
                avatar: 'https://media.discordapp.net/attachments/1133047566787956816/1140971207404040193/70e3da8ff1c8b2fe096c2b998841ca09.png',
            }).then(webhook => webhook.send({ content: `🧠 ${interaction.user}!\n- Pergunta: \`${question}\`\n- Resposta: *${choices[ball]}*` })).then(() => webhook.delete()).catch(() => { return; })

        } catch (e) {
            return interaction.reply({ content: "error" })
        }

    }
}
