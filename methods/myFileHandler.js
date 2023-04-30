const fs = require('fs');

module.exports = {
    load: (fileName) => {
        return (fs.readFileSync(fileName));
    },
    save: (fileName, data) => {
        fs.writeFileSync(fileName, data);
    }
}
