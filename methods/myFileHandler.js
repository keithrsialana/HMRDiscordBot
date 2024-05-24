const fs = require('fs');
const {resolve} = require('path');

module.exports = {
    getDate: () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '-' + dd + '-' + yyyy;
        return today;
    },
    getRealDate: () =>{
        var todayDate = new Date();
        var dd = String(todayDate.getDate()).padStart(2, '0');
        var mm = String(todayDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = todayDate.getFullYear();

        var realDate = {
            'day': dd,
            'month': mm,
            'year': yyyy
        }
        return realDate;
    },
    getTime: () => {
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();

        return `${hours}:${minutes}:${seconds}`;
    },
    // this function is so stupid lol
    pathExists: (path) =>{
        try{
            if (!fs.existsSync(path)){
                fs.mkdirSync(path);
            }
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    },
    fileExists: (filename) => {
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
        try{
            fs.writeFileSync(fileName, data);
        }catch(err){
            console.log(`There was a problem with saving: ${err.message}`);
        }
    },
    getPath: (fileName) => {
        return resolve(fileName).toString();
    }
}
