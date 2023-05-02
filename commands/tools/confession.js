const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder, GuildChannel } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('confess')
    .setDescription('Write an anonymous confession')
    .addStringOption((option) =>
        option
        .setName('confession')
        .setDescription('Confession content')
        .setRequired(true)
    )
    ,

    async execute(interaction, client) {
        // get the user input from options
        const embed = new EmbedBuilder()
        .setTitle("Confession")
        .setDescription(interaction.options.get("confession").value)
        .setColor(0x9C59B6)
        .setTimestamp(Date.now());
        
        if (interaction.channel.id == 485024625437310978){
            await interaction.reply({content: "Your confession was sent!", ephemeral:true});
            await interaction.channel.send({embeds:[embed], ephemeral: false});
        }else{
            const confessionChannel = interaction.guild.channels.cache.get('485024625437310978').toString();
            await interaction.reply({content: `You're not in the right channel! Head over to ${confessionChannel} to send a confession.`, ephemeral:true});
        }
    },
};