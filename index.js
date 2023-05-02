// Node's file system module, used to read the commands directory and identify command files.
const fs = require("node:fs");
//  Mode's native path utility module, helps construct paths to access files and directories. Automatically detects the operating system and uses the appropriate joiners.
const path = require("node:path");

// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const { token } = require("./config.json");

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();
client.commandsArray = [];

const functionFolders = fs.readdirSync(`./functions`);
for (const folder of functionFolders) {
  const functionsFiles = fs
    .readdirSync(`./functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionsFiles)
    require(`./functions/${folder}/${file}`)(client);    
}
// diagnosing discord api errors
client.on("unhandledRejection", async (err) => {
  console.error("Unhandled Promise Rejection:\n", err);
});
client.on("uncaughtException", async (err) => {
  console.error("Uncaught Promise Exception:\n", err);
});
client.on("uncaughtExceptionMonitor", async (err) => {
  console.error("Uncaught Promise Exception (Monitor):\n", err);
});
client.on("multipleResolves", async (type, promise, reason) => {
  console.error("Multiple Resolves:\n", type, promise, reason);
});

client.handleEvents();
client.handleCommands();

// Log in to Discord with your client's token
client.login(token);
