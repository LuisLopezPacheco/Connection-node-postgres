const express = require('express');
const auth = require('./auth/auth');

const app = express();

app.use(express.json());

// Ruta de login
app.post('/login', auth.login);



// Ruta protegida
app.get('/protegido', auth.verifyToken, (req, res) => {
  res.json({ message: `Bienvenido, ${req.user.username}!` });
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));