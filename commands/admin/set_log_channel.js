const {PermissionFlagsBits, SlashCommandBuilder,ChannelType} = require('discord.js');
var config = require('../../config.json');
const mfh = require('../../methods/myFileHandler.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('set_log_channel')
    .setDescription('Set the log channel')
    .addChannelOption(option => option
        .setName("channel")
        .setDescription("The channel you want the event to take place")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)),
    async execute(interaction,client){
        //TODO: Complete
        if (!config.logChannelID){
            config.logChannelID = null;
        }
        config.logChannelID = interaction.options.get("channel").channel.id;
        try{
            await mfh.save(mfh.getPath('config.json'), JSON.stringify(config));
            await interaction.reply({
                content: `The log channel has been saved`,
                ephemeral: true
            });
        }catch(err){
            console.error(err)
            await interaction.reply({
                content: `There was a problem with saving the channel ${err}`,
                ephemeral: true
            });
        }

    }
}