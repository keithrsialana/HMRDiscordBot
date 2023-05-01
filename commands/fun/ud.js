const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const {rapidAPI_key} = require('../../config.json')
const request = require('request');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('search-ud')
    .setDescription('Look for the definition of a word in the Urban Dicitonary')
    .addStringOption((option) =>
        option
        .setName('word')
        .setDescription('The word that will be looked up')
        .setRequired(true)
    ),

    async execute(interaction, client) {
        // Get input value
        // console.log(interaction.options._hoistedOptions[0].value)

        const options = {
        method: 'GET',
        url: 'https://mashape-community-urban-dictionary.p.rapidapi.com/define',
        qs: {term: `${interaction.options._hoistedOptions[0].value}`},
        headers: {
            'content-type': 'application/octet-stream',
            'X-RapidAPI-Key': rapidAPI_key,
            'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com'
        }
        };

        request(options, function (error, response, data) {
            if (error) throw new Error(error);
            // Shows retrieved data object from HTML request
            var returnedData = JSON.parse(data);
            // console.log(returnedData.list[0]);

            // -----------------------------------------------------------------------------------
            const embed = new EmbedBuilder()
            	.setTitle(returnedData.list[0].word)
            	.setDescription(returnedData.list[0].definition)
            	.setColor('Purple')
            	.setThumbnail('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.q7r_72mq8aFFyvZGyryl0gAAAA%26pid%3DApi&f=1&ipt=e186212f972791f2df7f563fcf25a826697eb3c62d937a837e42ee56b861140a&ipo=images')
            	.setTimestamp(Date.parse(returnedData.list[0].written_on))
            	.addFields([
            		{
            			name: `Example`,
            			value: `${returnedData.list[0].example}`,
            			inline: false
            		},
            		{
            			name: `Thumbs Ups`,
            			value: `${returnedData.list[0].thumbs_up}`,
            			inline: true
            		},
            		{
            			name: `Thumbs Downs`,
            			value: `${returnedData.list[0].thumbs_down}`,
            			inline: true
            		}
            	])
            	.setAuthor({
            		iconURL: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.q7r_72mq8aFFyvZGyryl0gAAAA%26pid%3DApi&f=1&ipt=e186212f972791f2df7f563fcf25a826697eb3c62d937a837e42ee56b861140a&ipo=images',
            		name: 'Urban Dictionary API'
            	})
            	.setFooter({
            		iconURL: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.q7r_72mq8aFFyvZGyryl0gAAAA%26pid%3DApi&f=1&ipt=e186212f972791f2df7f563fcf25a826697eb3c62d937a837e42ee56b861140a&ipo=images',
            		text: `${returnedData.list[0].author}`
            	})
            	.setURL(returnedData.list[0].permalink);

            interaction.reply({
                embeds: [embed],
                // content: "testing",
                ephemeral: false
            });
        });
    },
};