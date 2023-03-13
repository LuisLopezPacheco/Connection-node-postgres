const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

const UserModel = require('./model/model');

// mongoose.connect('mongodb://127.0.0.1:27017/passport-jwt', { useMongoClient: true });
// mongoose.connection.on('error', error => console.log(error) );
// mongoose.Promise = global.Promise;

require('./auth/auth');

// Middleware para parsear el cuerpo de las peticiones

const routes = require('./routes/routes');
const secureRoute = require('./routes/secure-routes');

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

// Endpoint para insertar un usuario
app.post('/users', (req, res) => {
  const { username, password } = req.body;
  const query = 'INSERT INTO users (username, password) VALUES ($1, $2)';
  const values = [username, password];
  pool.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al insertar usuario');
    } else {
      res.status(200).send('Usuario insertado correctamente');
    }
  });
});

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);

// Handle errors.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(3000, () => {
  console.log('Server started.')
});