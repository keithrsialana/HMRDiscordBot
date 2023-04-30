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
        const user = interaction.options.get("user").user
        await interaction.reply({
            content: "Kick was initiated",
            ephemeral: true
        });
        console.log(`${user.username}#${user.discriminator} was kicked! NOT`);
    }
}