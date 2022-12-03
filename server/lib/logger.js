import fs from "fs";

export default (msg) => {
    fs.appendFileSync("dbconnection.log", "\n ["+(new Date())+"}: "+msg+"\n", 'utf8')
}