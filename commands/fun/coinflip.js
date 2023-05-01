const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('flip')
    .setDescription('Toss a coin!'),

    async execute(interaction, client) {

        const rNumber = Math.floor(Math.random() * 10000);
        const result = rNumber % 2;

        const embed = new EmbedBuilder()
        .setTitle(`You flipped ${result == 0 ? 'Heads':'Tails'}!`)
        .setThumbnail(result == 0 ?
            "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fclipart-library.com%2Fimages_k%2Fquarter-transparent-background%2Fquarter-transparent-background-15.png&f=1&nofb=1&ipt=3febdbcb8290f77f96585eca9f048423c46aa6bcd4d36eae50456413ee9abf91&ipo=images"
            :
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.nicepng.com%2Fpng%2Ffull%2F146-1464848_quarter-png.png&f=1&nofb=1&ipt=d2b842650a158d4b6fd7e57f598682f772cc81d380c7f2fffa5208c7aa8c05ee&ipo=images"
        );
        try {
            await interaction.reply({embeds: [embed], ephemeral: false});
        }catch{
            await interaction.reply(`You flipped ${result == 0 ? 'Heads':'Tails'}!`);
        }
    }
};