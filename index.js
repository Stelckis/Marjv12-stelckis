const fs = require("fs");
const discord = require("discord.js");
const message = require("discord.js");
const args = require("discord.js")
const MessageEmbed = require("discord.js");
const client = new discord.Client({ disableMentions: "everyone" });
const { RoleManger } = require('discord-role-manager')

const { Player } = require("discord-player");

client.player = new Player(client);
client.config = require("./config/bot");
client.emotes = client.config.emojis;
client.filters = client.config.filters;
client.commands = new discord.Collection();

fs.readdirSync("./commands").forEach(classe => {
  const commands = fs
    .readdirSync(`./commands/${classe}`)
    .filter(files => files.endsWith(".js"));

  for (const file of commands) {
    const command = require(`./commands/${classe}/${file}`);
    console.log(`carregando comando de ${file}`);
    client.commands.set(command.name.toLowerCase(), command);
  }
});

const events = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
const player = fs.readdirSync("./player").filter(file => file.endsWith(".js"));

for (const file of events) {
  console.log(`discord.js evento em ${file}`);
  const event = require(`./events/${file}`);
  client.on(file.split(".")[0], event.bind(null, client));
}

for (const file of player) {
  console.log(`discord-player evento em ${file}`);
  const event = require(`./player/${file}`);
  client.player.on(file.split(".")[0], event.bind(null, client));
}

client.login("ODQ5Mzc3ODg3MzE2NjA2OTc2.YLaSzQ.0HFctXoZhXv3Eq3b8HTyRh0fXEg")
