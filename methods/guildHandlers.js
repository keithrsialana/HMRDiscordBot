const fs = require('fs');
const { guildID } = require('../config.json');

module.exports = {
    findGuildMember: (client, userID) => {
        let guild = client.guilds.cache.get(guildID);
        const user = guild.members.cache.get(userID);
        try{
            if (!user)
                return;
            else
                return user;
        }catch(err){
            console.log(`[ERROR] Something went wrong in findGuildMember.js \n${err}`);
        }
    }
}
