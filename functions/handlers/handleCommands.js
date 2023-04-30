// Disable stream/web warnings when running code, can stop the bot from running.
process.env.NODE_NO_WARNINGS = 'stream/web';

const fs = require("fs");
module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./commands");

    console.log("Passing commands through the handler...");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandsArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        try{
          commandsArray.push(command, command.data.toJSON());
        }catch{
          commandsArray.push(command, command.data);
        }
      }
    }
  };
};
