const ChangePresence = require("../../methods/changePresence");
const {presence} = require("../../config.json");
module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        ChangePresence.update(client, presence.status, presence.message, presence.afk);
        console.log(`Ready!!! ${client.user.tag} is logged in and online`);
    }
}