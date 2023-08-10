const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);
const economyPath = '../data/economy/economy.json'; // Confirmed path
const itemsPath = '../data/economy/items.json'; // Confirmed path
const aCooldownsPath = '../data/economy/attack_cooldowns.json' // Confirmed path
const acData = require(aCooldownsPath);
const eData = require(economyPath);
const iData = require(itemsPath);
const {attacks} = require('../config.json');

module.exports = {
    economy: eData,
    items: iData,
    attack_cooldowns: acData,

    // DATABASE ----------------------------
    getData() {
        return eData;
    },
    getItems() {
        return iData;
    },
    getCooldowns() {
        return acData;
    },
    async saveEconData() {
        try {
          await writeFile('./data/economy/economy.json', JSON.stringify(this.economy), (err) => {
            if (err) throw err;
            console.log('Data written to file');
          });
        } catch (error) {
          console.log('[ERROR] Error saving economy data:', error);
        }
    },
    async saveItemData() {
        try {
            await writeFile('./data/economy/items.json', JSON.stringify(this.items), (err) => {
                if (err) throw err;
                console.log('Data written to file');
              });
        }catch(error) {
            console.log('[ERROR] Error saving economy data:', error);
        }
    },
    async saveAttackCooldownsData() {
        try {
          await writeFile('./data/economy/attack_cooldowns.json', JSON.stringify(this.attack_cooldowns), (err) => {
            if (err) throw err;
            console.log('Data written to file');
          });
        } catch (error) {
          console.log('[ERROR] Error saving attack cooldowns data:', error);
        }
    },
    addItemToShop(id, name, price, maxQuantity){
        const itemObject = {
            id: id,
            name: name,
            price: price,
            maxQuantity: maxQuantity
        }

        this.items.itemsData.push(itemObject);
        this.saveItemData();
    },

    // USERS -------------------------------
    calculateLevel(userID){
        if (!this.economy)
            this.economy = eData;
        try {
            const user = this.findUser(userID);
            if (user){
                // 0.111358851 * x^0.5
                var result = 0.111358851 * (user.xp ** 0.5);
                return Math.floor(result);
            }
        }catch(err){
            console.log(`[ERROR] Couldn't calculate the user's Level: ${err}`);
        }    
    },
    findUser(userID) {
        if (!this.economy)
            this.economy = eData;
        try {
            const user = this.economy.economyData.find(x => x.id == userID);
            if (user){
                return user;
            }
        }catch{
            console.log(`[ERROR] Could not find User Data`);
        }
    },
    addUser(userObject) {
        // if it's a bot, skip this method
        if(userObject.bot || userObject.system)
            return;

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;

        let u = {
            id: userObject.id,
            xp: 0,
            balance: 0,
            lastDaily: null,
            lastMonthly: null,
            voiceJoinedAt: null,
            boughtItems: [],
        }

        if (!this.economy)
            this.economy = eData;
        try{
            this.economy.economyData.push(u);
        }catch{
            console.log("[ERROR] Could not add new user");
        }
    },
    setPoints(userID, points) {
        let eUser = this.findUser(userID);
        eUser.balance = points;
    },
    addPoints(userID, points) {
        let eUser = this.findUser(userID);
        eUser.xp += points;
        eUser.balance += points;
    },
    subtractPoints(userID, points) {
        let eUser = this.findUser(userID);
        eUser.balance -= points;
    },
    getInventory(userID) {
        let eUser = this.findUser(userID);
        return eUser.boughtItems;
    },

    // Economy Attacks ---------------------
    // TODO:
    checkUserCooldowns(userID){
        try{
            if (!this.attack_cooldowns)
                this.attack_cooldowns = acData;

            const usrObj = this.attack_cooldowns.find(x => x.id == userID);

            return usrObj;
        }catch(err){
            console.log(`[ERROR] There was a problem with checking User Cooldown: ${err}`);
        }
    },
    addAttackUser(userID){
        const userObj = {
            id: userID,
            cooldowns: []
        }
        if (!this.attack_cooldowns.find(user => user.id == userID))
            this.attack_cooldowns.push(userObj);
        else
            console.log(`[ERROR] user ${userID} already exists in the Attack Cooldowns DB`);
    },
    removeAttackUser(userID){
        try{
            const objToDelete = this.attack_cooldowns.find(obj => obj.id == userID);
            const newArray = this.attack_cooldowns.filter(user => user !== objToDelete);

            this.attack_cooldowns = newArray;
        }catch(err){
            console.log(`[ERROR] There was a problem trying to remove an attack user: ${err}`);
        }
    },
    addUserCooldown(userID, attackName, severity){
        const now = Date.now();
        try{
            const attackUser = this.attack_cooldowns.find(obj => obj.id == userID);
            const cooldownTime = attacks.cooldown_levels.find(obj => obj.name == severity);
            const endDate = now + cooldownTime.time;
    
            const cooldownObj = {
                name: attackName,
                launch: now,
                end: endDate
            }

            attackUser.cooldowns.push(cooldownObj);
        }catch(err){
            console.log(`[ERROR] There was a problem: ${err}`);
        }
    },
    removeUserCooldown(userID, attackName){
        try{
            const user = this.attack_cooldowns.find(user => user.id == userID);
            const cooldownObj = user.cooldowns.find(obj => obj.name == attackName);

            const newArray = user.cooldowns.filter(attack => attack !== cooldownObj);

            user.cooldowns = newArray;
        }catch(err){
            console.log(`[ERROR] There was a problem with trying to remove a user cooldown: ${err}`);
        }
    },
}