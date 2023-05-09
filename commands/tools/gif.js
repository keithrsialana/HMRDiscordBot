const { SlashCommandBuilder } = require("discord.js");
const {giphy_key} = require('../../config.json');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("gif")
    .setDescription("Get a gif")
    .addStringOption(option => option
        .setName("search")
        .setDescription("Find a gif using a search word")
        .setRequired(true)
    ),

    async execute(interaction,client){
        const limit = 10;
        const options = {
            method: 'GET',
            url: `https://api.giphy.com/v1/gifs/search`,
            headers: {
              'content-type': 'application/json'
            },
            params:{
                'api_key': giphy_key.toString(),
                'q': interaction.options.get("search").value.toString(),
                'limit': limit.toString(),
                'offset': '0',
                'rating': 'r',
                'lang': 'en'
            }
          };

          try{
            const response = await axios.request(options);
            const rNumber = Math.floor(Math.random() * limit);

            await interaction.reply(response.data.data[rNumber].url);
          }catch(err){
            console.log("Something went wrong");
            console.log(err);
            await interaction.reply({content:"Couldn't find a gif with that search", ephemeral:true});
          }
    }
}