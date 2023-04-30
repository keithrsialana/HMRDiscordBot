const axios = require('axios');
const {rapidAPI_key} = require('../../config.json');
module.exports = {
    data: {
      name: "horoscope",
      description: "Gets the daily horoscope information for your specific sign",
      options:[
        {
          name: "sign",
          description: "choose your sign",
          type: 3,
          required: true,
          choices:[
            {
              name: "Aries",
              value: "aries"
            },
            {
              name: "Taurus",
              value: "taurus"
            },
            {
              name: "Gemini",
              value: "gemini"
            },
            {
              name: "Cancer",
              value: "cancer"
            },
            {
              name: "Leo",
              value: "leo"
            },
            {
              name: "Virgo",
              value: "virgo"
            },
            {
              name: "Libra",
              value: "libra"
            },
            {
              name: "Scorpio",
              value: "scorpio"
            },
            {
              name: "Sagittarius",
              value: "sagittarius"
            },
            {
              name: "Capricorn",
              value: "capricorn"
            },
            {
              name: "Aquarius",
              value: "aquarius"
            },
            {
              name: "Pisces",
              value: "pisces"
            }
          ]
        }
      ]
    },

    // TODO: Fix request object
    async execute(interaction,client) {
        const options = {
            method: 'POST',
            url: 'https://sameer-kumar-aztro-v1.p.rapidapi.com/',
            params: {
              sign: interaction.options.get("sign").value.toString(),
              day: 'today'
            },
            headers: {
              'content-type': 'application/octet-stream',
              'X-RapidAPI-Key': rapidAPI_key,
              'X-RapidAPI-Host': 'sameer-kumar-aztro-v1.p.rapidapi.com'
            }
          };
          
          
          try {
              const response = await axios.request(options);
              console.log(response.data);
          } catch (error) {
              console.error(error);
          }
          console.log(interaction.options.get("sign").value);
    },
}