const { SlashCommandBuilder, MessageEmbed } = require('discord.js');
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
        const player = useMainPlayer();
        if (!interaction.member.voice.channel) {
            await interaction.reply("You must be in a voice channel to use this command.");
            return;
        }

        const queue = await player.createQueue(interaction.guild);

        let embed = new MessageEmbed();
        if (interaction.options.getSubcommand() === "song") {
            let url = interaction.options.getString("url");

            const result = await player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO,
            });

            if (result.tracks.length === 0) {
                await interaction.reply("No results found");
                return;
            }

            const song = result.tracks[0];
            await queue.addTrack(song);

            embed
                .setDescription(`Added **[${song.title}](${song.url})** to the queue.`)
                .setThumbnail(song.setThumbnail)
                .setFooter({ text: `Duration ${song.duration}` });
        }
        else if (interaction.options.getSubcommand() === "playlist") {
            let url = interaction.options.getString("url");

            const result = await player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST,
            });

            if (result.tracks.length === 0) {
                await interaction.reply("No results found");
                return;
            }

            const playlist = result.tracks[0];
            await queue.addTracks(playlist);

            embed
                .setDescription(`Added **[${playlist.title}](${playlist.url})** to the queue.`)
                .setThumbnail(playlist.setThumbnail)
                .setFooter({ text: `Duration ${playlist.duration}` });
        }
        else if (interaction.options.getSubcommand() === "search") {
            let url = interaction.options.getString("search-terms");

            const result = await player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO,
            });

            if (result.tracks.length === 0) {
                await interaction.reply("No results found");
                return;
            }

            const song = result.tracks[0];
            await queue.addTracks(song);

            embed
                .setDescription(`Added **[${song.title}](${song.url})** to the queue.`)
                .setThumbnail(song.setThumbnail)
                .setFooter({ text: `Duration ${song.duration}` });
        }

        if (!queue.playing) await queue.play();

        await interaction.reply({
            embeds: [embed]
        })
    }
}