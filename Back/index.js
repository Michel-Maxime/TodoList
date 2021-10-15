'use strict';

const express = require('express');
const todolist = './Todolist.json';
const fs = require('fs')

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.send('Hello World');
});


app.get('/home', (req, res) => {
  res.json({
    name: "bill",
    age: 99
  })
})

app.get('/todolist', (req, res) => {
  let todo = GetData(todolist);
  res.json(todo)
})

app.post('/post', (req, res) => {

  //lecture
  let todo = GetData(todolist)
  //On concetre
  todo.push(req.body)
  let data = JSON.stringify(todo)

  //ecriture
  fs.writeFileSync(todolist, data);
  res.json(GetData(todolist))
})


app.delete('/delete/:id', (req, res) => {
  let rawdata = fs.readFileSync(todolist);
  let todo = JSON.parse(rawdata);

  todo = todo.filter(td => td.id != req.params.id)

  let towrite = JSON.stringify(todo)

  fs.writeFileSync(todolist, towrite);

  res.json(JSON.parse(towrite))
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);


let GetData = (file) => JSON.parse(fs.readFileSync(file))