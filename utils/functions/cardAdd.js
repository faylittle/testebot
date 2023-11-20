module.exports = async (client, interaction, userdb, card, valor, i) => {
    const val = Number(valor);
    if (userdb.coins < valor) return i.followUp({ ephemeral: true, content: `${i.user}, você não tem \`${val} takas\`!` });

    let checkCardsAll = await client.db.find({ userId: { $regex: `^${interaction.guild.id}_` }, });

    if (checkCardsAll.some(u => u.cards.includes(card))) return i.followUp({ ephemeral: true, content: `${i.user}, essa personagem já foi resgatada!` });

    await client.db.updateOne({ userId: `${interaction.guild.id}_${interaction.user.id}` }, { $inc: { "coins": -val }, $push: { "cards": card } });

    return interaction.channel.send({ content: `💍 **|** ${interaction.user}, essa personagem **"${card}" agora é sua** e já está disponível em seu harém!` });

}