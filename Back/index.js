
const {app, PORT, HOST} = require('./config')
const toolkit = require('./toolkit');

app.get('/', (req, res) => {
  res.send('Hello, Express is running');
});

app.get('/todolist', (req, res) => {
  res.json(toolkit.GET())
})

app.post('/post', (req, res) => {
  let todo = toolkit.GET()
  todo.push(req.body)
  toolkit.POST(todo)
  res.json(toolkit.GET())
})

app.delete('/delete/:id', (req, res) => {
  let todo = toolkit.GET()
  todo = todo.filter(td => td.id != req.params.id)
  todo.map((td, key) => {
    td.id = key
  })
  toolkit.POST(todo)
  res.json(toolkit.GET())
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
