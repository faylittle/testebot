const Discord = require("discord.js");
const fs = require("fs");
module.exports = async (client) => {
  const SlashsArray = [];
  fs.readdir(`./commands`, (error, folder) => {
    folder.forEach(subfolder => {
      fs.readdir(`./commands/${subfolder}/`, (error, files) => {
        files.forEach((files) => {
          if (!files?.endsWith('.js')) return;
          files = require(`../commands/${subfolder}/${files}`);
          if (!files?.name) return;
          client.commands.set(files?.name, files);
          SlashsArray.push(files);
        });
      });
    });
  });
  client.once(Discord.Events.ClientReady, async () => {
    await client.application.commands.set(SlashsArray);
    console.log(`Carreguei ${SlashsArray.length} comandos!`)
    client.user.setPresence({ activities: [{ name: `Mika`, type: Discord.ActivityType.Competing }], status: 'online', });
    // kaiya.guilds.cache.forEach(guild => guild.commands.set({},))
  });
};
