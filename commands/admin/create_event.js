const { ChannelType, SlashCommandBuilder } = require("discord.js");

// TODO: Finish this

module.exports = {
    data: new SlashCommandBuilder()
        .setName("create_event")
        .setDescription("Create a scheduled event")
        .addChannelOption(
            option => option
            .setName("channel")
            .setDescription("The channel you want the event to take place")
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildVoice)
        )
    ,
    async execute(interaction, client){
        await interaction.reply("Nothing happened, this is a test");
    }
}