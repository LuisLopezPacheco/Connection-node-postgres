const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const users = require('../model/users');

async function login(req, res) {
  const { username, password } = req.body;
  const user = await users.getUserByUsername(username);
  if (!user) {
    console.log('User not found');
    return res.status(401).json({ message: 'Usuario o contraseña incorrecta' });
  }

  //Cambiar a salt = 12 
  const passwordEncrypted = bcrypt.hashSync(password, 10);
  const decryptedPassword = bcrypt.compareSync(password, passwordEncrypted);

  console.log('Contraseña hash: ' + decryptedPassword);
  const passwordMatches = await bcrypt.compareSync( password, passwordEncrypted );
  console.log(passwordMatches);
  if (!passwordMatches) {
    console.log(user);
    return res.status(401).json({ message: 'Usuario o contraseña incorrecta' });
  }
  const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
  return res.json({ token });
}

async function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No autorizado' });
  }
  try {
    const decodedToken = jwt.verify(token, config.jwtSecret);
    const user = await users.getUserById(decodedToken.id);
    if (!user) {
      return res.status(401).json({ message: 'No autorizado' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'No autorizado' });
  }
}

module.exports = {
  login,
  verifyToken
};
