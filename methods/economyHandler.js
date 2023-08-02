const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);
const economyPath = '../data/economy/economy.json'; // Confirmed path
const itemsPath = '../data/economy/items.json'; // Confirmed path
const eData = require(economyPath);
const iData = require(itemsPath);

module.exports = {
    economy: eData,
    items: iData,

    // DATABASE ----------------------------
    getData() {
        return eData;
    },
    getItems() {
        return iData;
    },
    async saveEconData() {
        try {
          await writeFile('./data/economy/economy.json', JSON.stringify(this.economy), (err) => {
            if (err) throw err;
            console.log('Data written to file');
          });
        } catch (error) {
          console.log('Error saving economy data:', error);
        }
    },
    async saveItemData() {
        try {
            await writeFile('./data/economy/items.json', JSON.stringify(this.items), (err) => {
                if (err) throw err;
                console.log('Data written to file');
              });
        }catch(error) {
            console.log('Error saving economy data:', error);
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
    //TODO:
    calculateLevel(userID){
        if (!this.economy)
            this.economy = eData;
        try {
            const user = this.findUser(userID);
            if (user){
                // 0.111358851 * x^0.5
                var result = 0.111358851 * (user.xp ** 0.5);
                console.log(result);
                return Math.floor(result);
            }
        }catch(err){
            console.log(`Couldn't calculate the user's Level: ${err}`);
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
            console.log(`Could not find User Data`);
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
            this.saveEconData();
        }catch{
            console.log("Could not add new user");
        }
    },
    setPoints(userID, points) {
        let eUser = this.findUser(userID);
        eUser.balance = points;
        this.saveEconData();
    },
    addPoints(userID, points) {
        let eUser = this.findUser(userID);
        eUser.xp += points;
        eUser.balance += points;
        this.saveEconData();
    },
    subtractPoints(userID, points) {
        let eUser = this.findUser(userID);
        eUser.balance -= points;
        this.saveEconData();
    },
    getInventory(userID) {
        let eUser = this.findUser(userID);
        return eUser.boughtItems;
    }
}