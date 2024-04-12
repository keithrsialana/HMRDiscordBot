const { SlashCommandBuilder } = require("discord.js");
const econHandler = require('../../methods/economyHandler.js');
const { EmbedBuilder } = require("@discordjs/builders");
const maxEmbedNumber = 10;

module.exports = {
    data: new SlashCommandBuilder()
    .setName("leaderboards")
    .setDescription("Shows a list of the top 100 members with the most points in Handmade Rice"),

    async execute(interaction, client) {
        let pointsData = econHandler.getData().economyData;
        pointsData.sort((a,b) => b.balance - a.balance);
        
        let top100 = [];
        for (let i = 0; i < maxEmbedNumber; i++){
            if (!pointsData[i])
                break;

            try{
                const member = interaction.guild.members.cache.get(pointsData[i].id.toString());
                if (!member){
                    console.log(`[ERROR] Could not find user with id ${pointsData[i].id}`);
                }
                top100.push({
                    number: i+1,
                    name: member?(member.user.username):"Unknown",
                    points: pointsData[i].balance.toLocaleString("en-US")
                }
            );
            }catch(err){
                console.log(`[ERROR] leaderboards.js error: `);
                console.log(err);
                break;
            }
            
        }

        let embed = new EmbedBuilder()
        .setTitle("Top 10 Handmade Rice Points Leaderboard")
        .setColor(0x9C59B6);

        top100.forEach(member => {
            embed.addFields({name: member.number+": "+ member.name, value:`${member.points} rice points`});
        });

        await interaction.reply({embeds: [embed]});
    },

    // TODO: Make pages of 10 on the embed, then let users click a "Next" and "Prev" button to navigate the top 100
    async nextPage(interaction, client){

    },

    async prevPage(interaction, client){

    }
}