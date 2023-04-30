const {PermissionFlagsBits, SlashCommandBuilder} = require('discord.js');
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
        console.log(interaction.options.get("user").member);
        const user = interaction.options.get("user").member;
        const reason = interaction.options.get('reason').value
        user.kick(interaction.options.get('reason').value)
        await interaction.reply({
            content: `${user.user.username}#${user.user.discriminator} was kicked. Reason: ${reason}`,
            ephemeral: true
        });
    }
}