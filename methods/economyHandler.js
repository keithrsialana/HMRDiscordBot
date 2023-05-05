const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);
const economyPath = '../economy/economy.json'; // Confirmed path
const itemsPath = '../economy/items.json'; // Confirmed path
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
          await writeFile('./economy/economy.json', JSON.stringify(this.economy), (err) => {
            if (err) throw err;
            console.log('Data written to file');
          });
        } catch (error) {
          console.log('Error saving economy data:', error);
        }
    },
    async saveItemData() {
        try {
            await writeFile('./economy/items.json', JSON.stringify(this.items), (err) => {
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
    updateUser(user) {
        try{
            this.economy.economyData.find(x => x.id == user.id) = user;
            this.saveEconData();
        }catch{
            console.log(`Could not update user ${user.id}`);
        }
    },
    findUser(userID) {
        if (!this.economy)
            this.economy = eData;
        try {
            const user = this.economy.economyData.find(x => x.id === userID);
            if (user){
                return user;
            }
        }catch{
            console.log(`Could not find User Data`);
        }
    },
    addUser(userObject) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;

        let u = {
            id:userObject.id,
            balance: 0,
            lastDaily: null,
            lastMonthly: null,
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