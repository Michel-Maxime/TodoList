const fs = require('fs')
const todolist = './Todolist.json';

let GET = () => JSON.parse(fs.readFileSync(todolist)) 

let POST = (data) => {
    let todo = JSON.stringify(data)
    fs.writeFileSync(todolist, todo)
  }

const toolkit = {
    GET,
    POST,
}
 
module.exports = toolkit;