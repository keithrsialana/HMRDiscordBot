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
        console.log(data);
        const messageContent = interaction.options.getString("content");
        try{
            await interaction.channel.send({
                content: `${messageContent}`
            });
            await interaction.reply({
                content: `Your message has been sent`,
                ephemeral: true
            });
        }catch(err){
            await interaction.reply({
                content: `There was a problem with sending your message ${err}`,
                ephemeral: true
            })
        }
    }
}