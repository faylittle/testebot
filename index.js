const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose.connect('mongodb+srv://arielbotpriv:oBt55RghwneaHUV4@cluster0.e9siz6g.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, });

const statusdb = mongoose.connection;
statusdb.on("error", console.error);
statusdb.on("open", () => {
  console.log("📚 | Conectada ao banco de dados com sucesso.");
});
client.db = require("./database/guild/ticket");
client.commands = new Collection();

module.exports = client;

require("./handlers/eventsLoaded")(client);
require("./handlers/commandsLoaded")(client);



client.login("MTE3NDc2MTEwNjUxNDkxOTQ1NA.Gs2SKN.vrlT_0aEajJD7xAad3BG6EBaynjxDBunORCmoQ");//oBt55RghwneaHUV4
process.on("unhandRejection", (reason, promise) => console.log(reason));
process.on("uncaughtException", (error, origin) => console.log(error, origin));
