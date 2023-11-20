const { 
    ApplicationCommandType, 
    ApplicationCommandOptionType
} = require("discord.js");

module.exports = {
    name: "modelo",
    description: "Comando para testes",
    type: ApplicationCommandType.ChatInput,
    options: [{
        name: "id",
        description: "Informe o ID",
        type: ApplicationCommandOptionType.String,
        required: true
    }, {
        name: "mensagem",
        description: "Informe a mensagem",
        type: ApplicationCommandOptionType.String,
        required: true
    }, {
        name: "descricao",
        description: "Informe a descrição",
        type: ApplicationCommandOptionType.String,
        required: true
    }],
    run: async (client, interaction) => {
        if (interaction.user.id !== "1089913259332739156") return interaction.reply({ content: `Esse comando deve ser utilizado somente pelas pessoas que estão me programando!`, ephemeral: true });

        const id = interaction.options.getString("id");
        const mensagem = interaction.options.getString("mensagem");
        const descricao = interaction.options.getString("descricao");

        const db = await client.db.findOne({ ticketId: id });
        if (!db) {
            const criador = new client.db({ ticketId: id });
            await criador.save();
        }
        await client.db.updateOne({ ticketId: id }, {
            $set: {
                "ticket.description": descricao,
                "ticket.message": mensagem
            }
        });
        interaction.reply({ ephemeral: true, content: "✅ **|** Ação finalizada com sucesso!" });
    }
}
