const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const ainasepics = require("ainasepics");
const colors = require("../../utils/colors.js");

module.exports = {
    name: "roleplay",
    description: "Diversão com seus usuários",
    type: ApplicationCommandType.ChatInput,
    options: [{
        name: "beijar",
        description: "Beije um usuário",
        type: ApplicationCommandOptionType.Subcommand,
        options: [{
            name: "usuario",
            description: "Menção ou ID do usuario",
            type: ApplicationCommandOptionType.User,
            required: true,
        }],
    }, {
        name: "abraçar",
        description: "Abrace um usuário",
        type: ApplicationCommandOptionType.Subcommand,
        options: [{
            name: "usuario",
            description: "Menção ou ID do usuario",
            type: ApplicationCommandOptionType.User,
            required: true,
        }],
    }, {
        name: "tapa",
        description: "Dar tapa um usuário",
        type: ApplicationCommandOptionType.Subcommand,
        options: [{
            name: "usuario",
            description: "Menção ou ID do usuario",
            type: ApplicationCommandOptionType.User,
            required: true,
        }],
    }],
    run: async (client, interaction) => {

        let user = interaction.options.getUser("usuario")
        let action = interaction.options.getSubcommand()

        let image;
        if (action === "beijar") image = await ainasepics.get('kiss').then(data => data.url).catch(() => null);
        if (action === "tapa") image = await ainasepics.get('slap').then(data => data.url).catch(() => null);
        if (action === "abraçar") image = await ainasepics.get('hug').then(data => data.url).catch(() => null);
        if (!image) return interaction.reply({ ephemeral: true, content: "error!" })

        interaction.reply({
            ephemeral: false,
            content: `<@${user.id}>`,
            embeds: [
                new EmbedBuilder()
                    .setDescription(`# ${action}\n${interaction.user} ${action.replace("tapa", "deu tapas em").replace("beijar", "deu um beijo em").replace("abraçar", "deu abraços em")} <@${user.id}>.`)
                    .setColor(colors.primary)
                    .setImage(image)
            ]
        })
    }
}
