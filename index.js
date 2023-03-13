const express = require("express");
const bodyParser = require("body-parser");
const db = require('./queries')
// Port
const port = 3000;
const app = express();

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.get("/", (req, res) => {
  res.json({
    message: "Hello Stranger! How are you?",
  });
});
// Listen
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});


app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

// whitelist
const whitelist = ['http://localhost:3000', 'http://localhost:3001']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));