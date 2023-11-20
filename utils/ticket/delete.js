
module.exports = async (client, i) => {
    await i.deferUpdate();
    i.followUp({ content: "O ticket será fechado em instantes.." });
    setTimeout(() => {
        i.channel.delete();
    }, 1500);
}