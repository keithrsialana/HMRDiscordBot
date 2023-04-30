const mfh = require('../../methods/myFileHandler.js');

module.exports = {
    name: 'messageCreate',
    async execute(client, message) {
        if (!message.author.bot){
            // get file data
            var data = JSON.parse(mfh.load('./config.json'));
            // add user to user list
            if (!data.users.includes(message.author.id)){
                data.users.push(message.author.id);
                mfh.save('./config.json', JSON.stringify(data));
                console.log(`File Data : ${data.users}`);
            }
        }    
    }
}