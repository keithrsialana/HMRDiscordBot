const {PermissionFlagsBits, SlashCommandBuilder} = require('discord.js');
// TODO: ban doesn't work
module.exports = {
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a server member')
    .addUserOption(option =>
        option
        .setName('user')
        .setDescription('Select a member')
        .setRequired(true)
        )
    .addStringOption(option =>
        option
        .setName('reason')
        .setDescription('The reason for the ban')
        )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction,client){
        const user = interaction.options.get("user").user
        const reason = interaction.options.get('reason').value
        user.ban(interaction.options.get('reason').value)
        await interaction.reply({
            content: `${user.username}#${user.discriminator} was banned. Reason: ${reason}`,
            ephemeral: true
        });
    }
}