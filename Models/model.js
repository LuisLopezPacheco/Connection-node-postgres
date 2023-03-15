// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');

// const UserSchema = new Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// });

// //Se ejecuta antes de guardar la información en la base de datos
// UserSchema.pre(
//     'save',
//     async function(next) {
//       const user = this;
//       const hash = await bcrypt.hash(this.password, 10);
  
//       this.password = hash;
//       next();
//     }
//   );
  

// const UserModel = mongoose.model('user', UserSchema);

// module.exports = UserModel;

const { Pool } = require('pg');
const bcrypt = require('bcrypt');

// configurar la conexión a la base de datos
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'db5',
  password: 'postgres',
  port: 5701,
  idleTimeoutMillis: 2000,
  connectionTimeoutMillis: 0,
});

// definir el modelo de usuario
const User = {
  async create(email, password) {
    // encriptar la contraseña antes de guardarla en la base de datos
    const hash = await bcrypt.hash(password, 10);
    
    // insertar el usuario en la tabla 'users'
    const query = {
      text: 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      values: [email, hash],
    };
    
    const { rows } = await pool.query(query);
    return rows[0];
  },
  
  async findByEmail(email) {
    // buscar el usuario en la tabla 'users' por su email
    const query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    };
    
    const { rows } = await pool.query(query);
    return rows[0];
  },
};

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})

module.exports = User;