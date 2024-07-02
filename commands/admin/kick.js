const {PermissionFlagsBits, SlashCommandBuilder} = require('discord.js');
const {logChannelID} = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a server member')
    .addUserOption(option =>
        option
        .setName('user')
        .setDescription('Select a member')
        .setRequired(true)
        )
    .addStringOption(option =>
        option
        .setName('reason')
        .setDescription('The reason for the kick')
        )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    async execute(interaction,client){
        const user = interaction.options.get("user").member;
        const reason = interaction.options.get('reason').value
        user.kick(interaction.options.get('reason').value);
        await interaction.guild.channels.cache.get(logChannelID).send({
            content:`${user.user.username} was kicked. Reason: ${reason}`,
            ephemeral: false
        });
        await interaction.reply({
            content: `${user.user.username} was kicked. Reason: ${reason}`,
            ephemeral: true
        });
    }
}