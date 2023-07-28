const { SlashCommandBuilder } = require("discord.js");
const econHandler = require('../../methods/economyHandler.js');
const { EmbedBuilder } = require("@discordjs/builders");
const maxEmbedNumber = 10000;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lb_position')
        .setDescription(`Tells you where you are placed in the rice points leaderboards.`)
    ,
    async execute(interaction,client){
        let pointsData = econHandler.getData().economyData;
        pointsData.sort((a,b) => b.balance - a.balance);
        
        let leaderboards = [];

        var i = 0;
        pointsData.forEach(member => {
            leaderboards.push({
                userID: member.id,
                number: i+1,
                points: pointsData[i].balance.toLocaleString("en-US")
            });
            i++;
        });

        const leaderboardUser = leaderboards.find(item => item.userID == interaction.member.user.id);
        await interaction.reply({content: `You are positioned at **#${leaderboardUser.number} with ${leaderboardUser.points} rice points!**`});
    }
}