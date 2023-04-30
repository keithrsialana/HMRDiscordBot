const { SlashCommandBuilder } = require('discord.js');
// TODO: Finish this
module.exports = {
    data: new SlashCommandBuilder()
    .setName('create-poll')
    .setDescription('Create a Poll! Maximum 5 options!')
    .addStringOption(option => option
        .setName('option1')
        .setDescription('Vote option 1')
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName('option2')
        .setDescription('Vote option 2')
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName('option3')
        .setDescription('Vote option 3')
    )
    .addStringOption(option => option
        .setName('option4')
        .setDescription('Vote option 4')
    )
    .addStringOption(option => option
        .setName('option5')
        .setDescription('Vote option 5')
    )
    ,

    async execute(interaction, client) {
        const option1 = interaction.options.get('option1').value;
        const option2 = interaction.options.get('option2').value;
        const option3 = interaction.options.get('option3').value ? interaction.options.get('option3').value : (interaction.options.get('option3').value = null);
        const option4 = interaction.options.get('option4').value ? interaction.options.get('option4').value : (interaction.options.get('option4').value = null);
        const option5 = interaction.options.get('option5').value ? interaction.options.get('option5').value : (interaction.options.get('option5').value = null);
        await interaction.reply({

        });
    },
};