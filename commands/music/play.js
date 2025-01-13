const { SlashCommandBuilder, MessageEmbed, PermissionsBitField } = require('discord.js');
const { QueryType, useMainPlayer } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Plays a song")
        .addSubcommand(subcommand =>
            subcommand
                .setName("search")
                .setDescription("Search for a song")
                .addStringOption(option =>
                    option
                        .setName("search-terms")
                        .setDescription("The song to search for")
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("playlist")
                .setDescription("Plays a playlist from YouTube")
                .addStringOption(option =>
                    option
                        .setName("url")
                        .setDescription("The playlist url")
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("song")
                .setDescription("Plays a song from YouTube")
                .addStringOption(option =>
                    option
                        .setName("url")
                        .setDescription("The song url from YouTube")
                        .setRequired(true)
                )
        ),
    execute: async (interaction, client) => {
        // Get the player instance and song query
        const player = useMainPlayer();
        // Get the voice channel of the user and check permissions
        const voiceChannel = interaction.member.voice.channel;

        // Error handling
        if (!voiceChannel) {
            return interaction.reply('You need to be in a voice channel to play music!');
        }
        if (interaction.guild.members.me.voice.channel && interaction.guild.members.me.voice.channel !== voiceChannel) {
            return interaction.reply('I am already playing in a different voice channel!');
        }
        if (!voiceChannel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.Flags.Connect)) {
            return interaction.reply('I do not have permission to join your voice channel!');
        }
        if (!voiceChannel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.Flags.Speak)) {
            return interaction.reply('I do not have permission to speak in your voice channel!');
        }

        try {
            let query = '';
            switch (interaction.options.getSubcommand()) {
                case 'search':
                    query = interaction.options.getString('search-terms', true);
                    // Play the song in the voice channel
                    const result = await player.play(voiceChannel, query, {
                        nodeOptions: {
                            metadata: { channel: interaction.channel }, // Store text channel as metadata on the queue
                        },
                    });
                    return;
                // // Reply to the user that the song has been added to the queue
                // return interaction.reply(`${result.track.title} has been added to the queue!`);
                case 'playlist':
                    query = interaction.options.getString('url', true);
                    break;
                case 'song':
                    query = interaction.options.getString('url', true);
                    break;
            }
            return interaction.reply(`This feature has not been implemented yet`);
        } catch (error) {
            // Handle any errors that occur
            console.error(`There was an error LOL: ${error}`);
            return interaction.reply('An error occurred while playing the song!');
        }
    }
}