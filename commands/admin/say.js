const {PermissionFlagsBits, SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Make the bot say something')
    .addStringOption(option =>
        option
        .setName('content')
        .setDescription('write what you want the bot to say')
        )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction,client){
        const messageContent = interaction.options.get("content").value;
        await interaction.reply({
            content: `${messageContent}`,
            ephemeral: false
        });
    }
}