const axios = require('axios');
const {EmbedBuilder} = require('discord.js');
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
              value: "Aries"
            },
            {
              name: "Taurus",
              value: "Taurus"
            },
            {
              name: "Gemini",
              value: "Gemini"
            },
            {
              name: "Cancer",
              value: "Cancer"
            },
            {
              name: "Leo",
              value: "Leo"
            },
            {
              name: "Virgo",
              value: "Virgo"
            },
            {
              name: "Libra",
              value: "Libra"
            },
            {
              name: "Scorpio",
              value: "Scorpio"
            },
            {
              name: "Sagittarius",
              value: "Sagittarius"
            },
            {
              name: "Capricorn",
              value: "Capricorn"
            },
            {
              name: "Aquarius",
              value: "Aquarius"
            },
            {
              name: "Pisces",
              value: "Pisces"
            }
          ]
        }
      ]
    },

    // TODO: Fix request object
    async execute(interaction,client) {
        const options = {
            method: 'POST',
            url: `https://ohmanda.com/api/horoscope/${interaction.options.get("sign").value.toLowerCase()}/`,
            headers: {
              'content-type': 'application/json',
            }
          };          
          try {
              const response = await axios.request(options);
              
              const embed = new EmbedBuilder()
              .setTitle(`${interaction.options.get("sign").value}`)
              .setDescription(`${response.data.horoscope}`)
              .setColor('Purple')
              .setTimestamp(Date.parse(response.data.date))
              .setFooter({
                text: "Ohmanda.com Horoscope API"
              })
              await interaction.reply({
                embeds: [embed],
                ephemeral: false
              })
          } catch (error) {
              console.error(error);
          }
    },
}