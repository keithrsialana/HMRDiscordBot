const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('embed')
		.setDescription('Returns an Embed message'),

	async execute(interaction, client) {
		const embed = new EmbedBuilder()
			.setTitle('This is an EMBED!')
			.setDescription('This is an example Embed!')
			.setColor('Purple')
			.setImage(client.user.displayAvatarURL())
			.setThumbnail(client.user.displayAvatarURL())
			.setTimestamp(Date.now())
			.addFields([
				{
					name: `Field 1`,
					value: `Value 1`,
					inline: true
				},
				{
					name: `Field 2`,
					value: `Value 2`,
					inline: true
				}
			])
			.setAuthor({
				url: `https://google.com/`,
				iconURL: client.user.displayAvatarURL(),
				name: interaction.user.tag
			})
			.setFooter({
				iconURL: interaction.user.displayAvatarURL(),
				text: interaction.user.tag
			})
			.setURL(`https://google.com/`);

		await interaction.reply({
			embeds: [embed],
			ephemeral: false
		});
	},
};