const express = require('express')
const app = express()
const port = 3789
const defaultData = require('./db/defaultData')
const cors = require('cors')
const auth = require('./routes/auth')
const projects = require('./routes/projects')
const db = require('./db')

app.use(cors())
db.defaults(defaultData).write()

app.use(express.json()) 

app.get('/me', auth.me)
app.post('/login', auth.login)
app.post('/signin', auth.signin)

app.get('/projects/list', projects.getAll)
app.get('/projects/detail/:id', projects.getItem)
app.post('/projects/new', projects.createNew)
app.put('/projects/update/:id', projects.updateItem)
app.put('/projects/delete/:id', projects.deleteItem)

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))