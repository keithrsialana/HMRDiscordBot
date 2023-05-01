const fs = require('fs');
// TODO: Fix file.
module.exports = {
    name: 'guildMemberAdd',

    async execute(client, guildMember) {
        // get file data
        var data = JSON.parse(mfh.load('./config.json'));
        // add user to user list
        if (!data.users.includes(guildMember.id)){
            data.users.push(guildMember.id);
            mfh.save('./config.json', JSON.stringify(data));
            console.log(`File Data : ${data.users}`);
        }
    }
}