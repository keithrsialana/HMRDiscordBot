const { SlashCommandBuilder } = require("discord.js")
const econHandler = require("../../methods/economyHandler.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`pay`)
    .setDescription(`Pay another member from your own points balance!`)
    .addMentionableOption(option => option
        .setName(`member`)
        .setDescription(`The member you want to give your points to.`)
        .setRequired(true)
    )
    .addNumberOption(input => input
        .setName(`points`)
        .setDescription(`The number of points that you want to give out`)
        .setRequired(true)
    ),

    async execute(interaction, client){
        const user = interaction.member;
        const mentioned = interaction.options.get(`member`).user;
        const points = interaction.options.get(`points`).value;

        if (points == null || points <= 0){
            await interaction.reply({content:`You've entered an invalid amount of points! Please input something over 0.`, ephemeral:true});
            return;
        }

        try {
            var dbInteractionUser = econHandler.findUser(interaction.member.user.id);
            var dbMentionedUser = econHandler.findUser(mentioned.id);

            if (dbInteractionUser && dbMentionedUser){
                if(dbInteractionUser.balance >= points){
                    econHandler.subtractPoints(dbInteractionUser.id,points);
                    econHandler.addPoints(dbMentionedUser.id, points);
                    econHandler.saveEconData();
                    // await interaction.reply({content:`You have given ${mentioned.nickname ? mentioned.nickname : mentioned.username} ${points} rice points!`, ephemeral:false});
                    await interaction.reply({content:`You have given ${mentioned} ${points} rice points!`, ephemeral:false});
                }
                else{
                    await interaction.reply({content:`You don't have enough to give away ${points} rice points!`, ephemeral:true});
                }
            }
            else {
                await interaction.reply({content:`There was a problem with trying to find a user in the database`, ephemeral:true});
            }
        }catch(err){
            console.log(`[ERROR] ${err}`);
        }
    }
}