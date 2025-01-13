const { Events } = require('discord.js');
const {useMainPlayer} = require('discord-player');

module.exports = {
	name: Events.InteractionCreate,
	async execute(client, interaction) {
		if (!interaction.isChatInputCommand()) return;

		// Tries to find the command within the existing command files
		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		// Command module async method 'execute' is performed when the interactionCreate event is triggered
		try {
			const player = useMainPlayer();

			const data = {
				guild: interaction.guild,
			};

			await player.context.provide(data, () => command.execute(interaction, client));
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
	},
};
