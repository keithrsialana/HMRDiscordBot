const ChangePresence = require("../../methods/changePresence");
const {presence} = require("../../config.json");
const checkVC = require('../../methods/checkVCStartup');
module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        checkVC.check(client);
        ChangePresence.update(client, presence.status, presence.message, presence.afk);
        console.log(`Ready!!! ${client.user.tag} is logged in and online`);
    }
}