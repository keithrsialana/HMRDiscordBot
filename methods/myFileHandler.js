const fs = require('fs');

module.exports = {
    getDate: () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '-' + dd + '-' + yyyy;
        return today;
    },
    getTime: () => {
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();

        return `${hours}:${minutes}:${seconds}`;
    },
    exists: (filename) => {
        try {
            const file = fs.readFileSync(filename);
            return true;
        } catch (err){
            console.log(err+"\n Sending false...");
            return false;
        }
    },
    load: (fileName) => {
        return (fs.readFileSync(fileName));
    },
    save: (fileName, data) => {
        fs.writeFileSync(fileName, data);
        fs.closeSync()
    }
}
