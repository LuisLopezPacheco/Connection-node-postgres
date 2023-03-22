const express = require("express");
//Analice los cuerpos de las solicitudes entrantes en un middleware
//antes que sus controladores, disponibles en la propiedad req.body.
const bodyParser = require("body-parser");

const jwt = require("jsonwebtoken");

// Port
const port = 3001;

const app = express();

app.use(express.json())    // <==== parse request body as JSON
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))


const db = require('./queries')

const TOKEN_KEY = "secretToken";

// const veryfyToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   console.log(token);
//   if (token == null)
//   {
//     return res.status(401).send("Token requerido");
//   }
//   jwt.verify(token, TOKEN_KEY, (err, user) => {
//     if (err) {
//       return res.status(403).send("Token invalido");
//     }
//     console.log(user);
//     req.user = user;

//     next();
//   });
// }

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("No se proporcionó un token");
  }

  try {
    const decoded = jwt.verify(token, 'secretToken');
    req.userId = decoded.userId;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).send("Token no válido");
  }
}

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.post('/login', db.authUser);
app.get('/users', verifyToken, db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);

//respuesta simple JSON
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
})


