const { SlashCommandBuilder } = require("discord.js");
const economyHandler = require('../../methods/economyHandler');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("level")
    .setDescription("Shows you your level")
    .addUserOption(option => 
        option
        .setName('user')
        .setDescription('Select a member')
        .setRequired(false)),

    async execute(interaction,client){
        try{
            const optionalUser = interaction.options.get(`user`)?
            interaction.options.get(`user`):null;

            const userLvl = economyHandler.calculateLevel(optionalUser?
            optionalUser.user.id:interaction.member.user.id);

            if (optionalUser)
                await interaction.reply({content: `${optionalUser.user} is **Level ${userLvl}**`});
            else
                await interaction.reply({content: `You are **Level ${userLvl}**`});
        } catch (err) {
            await interaction.reply({content: "There was a problem in calculating your level", ephemeral: true});
        }
    }
}