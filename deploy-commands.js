// Run when new commands are made

const { REST, Routes } = require('discord.js');
const { clientId, token, guildID } = require('./config.json');
const fs = require('node:fs');

const commands = [];
const commandFolders = fs.readdirSync(`./commands`);

let commandFiles = null;
for(const folder of commandFolders){
	// Grab all the command files from the commands directory you created earlier
	commandFiles = fs
	.readdirSync(`./commands/${folder}`)
	.filter(file => file.endsWith('.js'));

	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		try{
			commands.push(command.data.toJSON());
		}catch{
			commands.push(command.data);
		}
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
