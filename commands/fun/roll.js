module.exports = {
    data: {
        name: 'roll',
        description: 'Roll a dice',
        options:[
            {
                name: 'dice',
                description: 'Choose a die',
                type: 3,
                choices:[
                    {
                        name: '4 - Sided',
                        value: '4'
                    },
                    {
                        name: '6 - Sided',
                        value: '6'
                    },
                    {
                        name: '8 - Sided',
                        value: '8'
                    },
                    {
                        name: '10 - Sided',
                        value: '10'
                    },
                    {
                        name: '12 - Sided',
                        value: '12'
                    },
                    {
                        name: '20 - Sided',
                        value: '20'
                    }
                ]
            }
        ]
    },
    async execute(interaction, client){
        const die = parseInt(interaction.options.get("dice").value);
        const rNumber = Math.floor(Math.random() * 10000);
        var result = rNumber % die;
        if (result == 0){
            result = 8;
        }
        await interaction.reply
        (
            {
                content: `Your ${die}-sided die rolled a ${result}`,
                ephemeral: false
            }
        );
    }
}