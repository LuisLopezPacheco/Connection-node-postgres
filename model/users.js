const bcrypt = require('bcrypt');
const users = [
  {
    id: 1,
    username: 'usuario1',
    password: '$2b$10$mrsn.WMw1jKImLLVybd4HOy9djHwnIRxvmWgKjS.DItT3TVV7q3NO' // Contraseña encriptada usando bcrypt
  },
  {
    id: 2,
    username: 'usuario2',
    password: '$2b$10$LBPtBgH1eJPV3v7GuYEDYecXCuESqV2EKkwsCeJNfx3HXIdd7THD2' // Contraseña encriptada usando bcrypt
  },
  {
    id: 3,
    username: 'usuario3',
    password: 'hola'
  }
];

async function getUserByUsername(username) {
  return users.find(user => user.username === username);
}

async function getUserById(id) {
  return users.find(user => user.id === id);
}

async function createUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const id = users.length + 1;
  const newUser = {
    id,
    username,
    password: hashedPassword
  };
  users.push(newUser);
  return newUser;
}

module.exports = {
  getUserByUsername,
  getUserById,
  createUser
};
