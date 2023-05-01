const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
// TODO: Finish this
module.exports = {
    data: new SlashCommandBuilder()
    .setName('create-poll')
    .setDescription('Create a Poll! Maximum 5 options!')
    .addStringOption(option => option
        .setName('question')
        .setDescription('The poll question')
        .setRequired(true)
    )
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
        .setDescription('Vote option 3 (optional)')
    )
    .addStringOption(option => option
        .setName('option4')
        .setDescription('Vote option 4 (optional)')
    )
    .addStringOption(option => option
        .setName('option5')
        .setDescription('Vote option 5 (optional)')
    )
    ,

    async execute(interaction, client) {
        const question = interaction.options.get("question").value;
        const pollOptions = []
        const option1 = interaction.options.get('option1').value;
        const option2 = interaction.options.get('option2').value;
        var option3 = null;
        var option4 = null;
        var option5 = null;

        try{
            // Confirmed to be working
            option3 = interaction.options.get('option3')? interaction.options.get('option3').value : null;
            option4 = interaction.options.get('option4')? interaction.options.get('option4').value : null;
            option5 = interaction.options.get('option5')? interaction.options.get('option5').value : null;
        }
        catch {
            console.log(console.error);
        }

        // Used to find how many options were created
        pollOptions.push(option1,option2);
        if (option3)
            pollOptions.push(option3);
        if (option4)
            pollOptions.push(option4);
        if (option5)
            pollOptions.push(option5);

        // Create new poll Embed
        const embed = new EmbedBuilder()
        .setTitle("Poll")
        .setDescription(question)
        .setThumbnail("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.vexels.com%2Fmedia%2Fusers%2F3%2F152593%2Fisolated%2Fpreview%2Fd6368d8155eb832733a200df87f48e92-purple-circle-question-mark-icon-by-vexels.png&f=1&nofb=1&ipt=cbc45922a9d2c5f75c663a3304708a9bff1314064d588c0cca877621387321f6&ipo=images")
        .setColor('Purple');

        // Add fields, can include optional ones
        const emojiArrays = ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣'];
        var fieldNumber = 0;
        for (const option in pollOptions){
            embed.addFields({name:`Option ${fieldNumber+1}`, value: `${emojiArrays[fieldNumber]} : ${interaction.options.get(`option${fieldNumber+1}`).value}`});
            fieldNumber++;
        }
        
        try{
            fieldNumber = 0;
            // replies need to come within 3 seconds of the command being run. Reply needs to be put here before the reactions.
            try{
                await interaction.reply({content: "Poll was created", ephemeral: true});
            }catch{
                console.log("Reply was not sent.");
            }
            const message = await interaction.channel.send({embeds: [embed]});
            for (const option in pollOptions){
                await message.react(emojiArrays[fieldNumber]);
                fieldNumber++;
            }
        }
        catch{
            console.log(console.error);
        }
    }
};