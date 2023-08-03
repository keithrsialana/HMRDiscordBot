const { SlashCommandBuilder } = require("discord.js");
const econHandler = require()

// TODO:
module.exports = {
    data: new SlashCommandBuilder()
    .setName('steal')
    .setDescription('(Requires 1000 rice points to execute) Will let you attempt to steal points from someone. *Cooldown: 24 hours*')
    .addUserOption(member => 
        member
        .setName(`user`)
        .setDescription('The user you want to steal from')
        .setRequired(true))
    .addNumberOption(points =>
        points
        .setName('points')
        .setDescription('The amount of points you want to steal')
        .setRequired(true))
    ,

    async execute(interaction, client){

    }
}