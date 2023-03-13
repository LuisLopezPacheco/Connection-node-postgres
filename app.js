const express = require("express");
//Analice los cuerpos de las solicitudes entrantes en un middleware
//antes que sus controladores, disponibles en la propiedad req.body.
const bodyParser = require("body-parser");
const db = require('./queries')
// Port
const port = 3000;

const app = express();


app.use(bodyParser.json());

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users/:name/:email/:password', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

//respuesta simple JSON
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})


