const {
  Events,
  ChannelType
} = require("discord.js");
const client = require("../../index.js")
module.exports = {
  name: Events.MessageCreate,
  once: false,
  execute(ctx) {
    if (ctx.author.bot) return;
    if (ctx.channel.type !== ChannelType.GuildText) return;
    if (ctx.content === `<@${client.user.id}>` || ctx.content === `<@!${client.user.id}>`) return ctx.reply({ content: `Olá mundo!!` });
  }
}
