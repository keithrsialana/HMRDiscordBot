const { SlashCommandBuilder, Options } = require('discord.js');
const {rapidAPI_key} = require('../../config.json');
const axios = require('axios');

const languages = [
              {
                name: "English",
                value: "en"
              },
              {
                name: "Spanish",
                value: "es"
              },
              {
                name: "Japanese",
                value: "ja"
              },
              {
                name: "German",
                value: "de"
              },
              {
                name: "French",
                value: "fr"
              },
              {
                name: "Hindi",
                value: "hi"
              },
              {
                name: "Arabic",
                value: "ar"
              },
              {
                name: "Bengali",
                value: "bn"
              },
              {
                name: "Chinese",
                value: "zh"
              },
              {
                name: "Hungarian",
                value: "hu"
              },
              {
                name: "Icelandic",
                value: "is"
              },
              {
                name: "Italian",
                value: "it"
              },
              {
                name: "Indonesian",
                value: "id"
              },
              {
                name: "Korean",
                value: "ko"
              },
              {
                name: "Malay",
                value: "ms"
              },
              {
                name: "Norwegian",
                value: "no"
              },
              {
                name: "Persian",
                value: "fa"
              },
              {
                name: "Polish",
                value: "po"
              },
              {
                name: "Portuguese",
                value: "pt"
              },
              {
                name: "Punjabi",
                value: "pa"
              },
              {
                name: "Russian",
                value: "ru"
              },
              {
                name: "Tagalog",
                value: "tl"
              },
              {
                name: "Thai",
                value: "th"
              },
              {
                name: "Turkish",
                value: "tr"
              },
              {
                name: "Urdu",
                value: "ur"
              }
            ]

module.exports = {
    data: {
        name: "translate",
        description: "Google Translate!",
        options:[
          {
            name: "from",
            description: "choose original language",
            type: 3,
            required: true,
            choices:languages
          },
          {
            name: "to",
            description: "choose translation language",
            type: 3,
            required: true,
            choices:languages
          },
          {
            name: "sentence",
            description: "the sentence you want translated",
            type: 3,
            required: true
          }
        ]
      },
    async execute(interaction,client){

        const encodedParams = new URLSearchParams();

        encodedParams.set('source', interaction.options.get('from').value);
        encodedParams.set('target', interaction.options.get('to').value);
        encodedParams.set('q', interaction.options.get('sentence').value);
        encodedParams.set('format','text');

        const options = {
            method: 'POST',
            url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
              'Accept-Encoding': 'application/gzip',
              'X-RapidAPI-Key': rapidAPI_key,
              'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
            },
            data: encodedParams,
          };

        try{
            const response = await axios.request(options);
            const translated = JSON.stringify(response.data.data.translations[0].translatedText)
            if (!response)
                await interaction.reply({content: 'There was nothing to translate!', ephemeral:false});
            else
                await interaction.reply(translated);
        }catch(err){
            console.log(`[ERROR] There was a problem with translate.js`);
            console.log(err);
        }
    }
}