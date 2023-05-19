const { SlashCommandBuilder, Options } = require('discord.js');
const pirateSpeak = require('pirate-speak');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pirate')
    .setDescription('Translate your sentence to pirate speak!')
    .addStringOption(option => option
        .setName('sentence')
        .setDescription('The sentence you want to translate')
        .setRequired(true)
    ),
    async execute(interaction,client){
        const input = interaction.options.get('sentence').value;
        try{
            const translated = pirateSpeak.translate(input);
            if (!translated)
                await interaction.reply({content: 'There was nothing to translate!', ephemeral:true});
            else
                await interaction.reply(translated);
        }catch(err){
            console.log(`There was a problem with pirate.js`);
            console.log(err);
        }
    }
}