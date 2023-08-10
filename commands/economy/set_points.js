const { PermissionFlagsBits,SlashCommandBuilder } = require("discord.js");
const econHandler = require("../../methods/economyHandler.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("set_points")
    .setDescription("Set the amount of points someone has")
    .addMentionableOption(option => option
        .setName("member")
        .setDescription("The member to modify points")
        .setRequired(true)
        )
    .addIntegerOption(option => option
        .setName("points")
        .setDescription("The amount of points you want this person to have")
        .setRequired(true)
        )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction, client){
        const user = interaction.options.get("member").user;
        let econUser = econHandler.findUser(user.id);

        try {
            if (!econUser)
                econHandler.addUser(user);

            econUser = econHandler.economy.economyData.find(x => x.id == user.id);
            if (econUser) {
                econHandler.setPoints(econUser.id, interaction.options.get("points").value);
                econHandler.saveEconData();
                await interaction.reply({ content: "User points changed", ephemeral:true });
            }
            else {
                console.log("[ERROR] Could not find user");
            }
        } catch (error) {
            await interaction.reply({ content: "There was a problem with changing user points: " + error, ephemeral: true });
        }

    }
}