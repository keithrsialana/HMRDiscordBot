const eData = require('../data/economy/economy.json');
const economyHandler = require('../methods/economyHandler');
const {PER_SECOND_POINTS} = require('../data/economy/econSettings.json');

module.exports = {
    calculatePoints(eUser, now){
        try{
            const timeDiff = now - eUser.voiceJoinedAt;

            if (timeDiff < 0){
                economyHandler.saveEconData();
                return 0;
            }
    
            if (eUser.voiceJoinedAt){
                eUser.voiceJoinedAt = null;
                economyHandler.saveEconData();
            }
            const seconds = timeDiff / 1000;
    
            if (seconds <= 0){
                eUser.voiceJoinedAt = null;
                economyHandler.saveEconData();
                return 0;
            }
            const pointsToAdd = Math.trunc(seconds * PER_SECOND_POINTS);
    
            if (pointsToAdd <= 0){
                eUser.voiceJoinedAt = null;
                economyHandler.saveEconData();
                return 0;
            }
        
            return pointsToAdd;
        }catch (err){
            console.log(`[ERROR] There was a problem in calculatePoints(): ${err}`);
        }
    },

    async check(client) {
        var guild = await client.guilds.cache.find(i => i.id == 245650319638396938);
        eData.economyData.forEach(item => {
            // if (item.balance != 0){
            //     item.balance = 0;
            //     item.xp = 0;
            //     economyHandler.saveEconData();
            // }
            // Voice Channel Check
            if (item.voiceJoinedAt != null){
                var user = guild.members.cache.find(i => i.id == item.id);
                if (!user.voice.channelId){
                    const pointsToAdd = this.calculatePoints(item, Date.now());
                    item.voiceJoinedAt = null;
                    if (pointsToAdd && pointsToAdd > 0){
                        economyHandler.addPoints(item.id, pointsToAdd);
                        economyHandler.saveEconData();
                    }
                }
            }
        })
    }    
};