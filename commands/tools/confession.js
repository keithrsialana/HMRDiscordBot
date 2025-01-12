const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder, GuildForumThreadManager } = require('discord.js');
const {confessionTXTChannel} = require('../../config.json');

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

    // TODO: To Create a Forum Thread confession instead of using a channel.
    // - How do I create a confession? Do I need another channel to use the command?
    // - How do I get the Forum Channel ID?
    // - How do I set the ThreadManager to work on a specific Channel ID?
    
    // async execute(interaction){
    //     var forum = new GuildForumThreadManager();

    //     forum.threads
    //         .create({
    //             name: 'Food Talk',
    //             autoArchiveDuration: ThreadAutoArchiveDuration.OneHour,
    //             message: {
    //             content: 'Discuss your favorite food!',
    //             },
    //             reason: 'Needed a separate thread for food',
    //         })
    //         .then(threadChannel => console.log(threadChannel))
    //         .catch(console.error);
    // },

    async execute(interaction, client) {
        // get the user input from options
        const embed = new EmbedBuilder()
        .setTitle("Confession")
        .setDescription(interaction.options.get("confession").value)
        .setColor(0x9C59B6)
        .setTimestamp(Date.now());
        
        if (interaction.channel.id == confessionTXTChannel){
            const d = Date();
            console.log(`${interaction.member.user.displayName}(${interaction.member.user.username}) created a confession at ${d.toLocaleString("en-US")}`);
            await interaction.reply({content: "Your confession was sent!", ephemeral:true});
            await interaction.channel.send({embeds:[embed], ephemeral: false});
        }else{
            const confessionChannel = interaction.guild.channels.cache.get(confessionTXTChannel).toString();
            await interaction.reply({content: `You're not in the right channel! Head over to ${confessionChannel} to send a confession.`, ephemeral:true});
        }
    },
};