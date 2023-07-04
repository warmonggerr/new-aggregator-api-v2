const fs = require("fs");
const path = require("path");

class Data{
    static getData(){
        let readPath = path.join(__dirname,'data.json');
        let jsonString = fs.readFileSync(readPath,"utf-8")
        return JSON.parse(jsonString)
    }
}

module.exports = Data