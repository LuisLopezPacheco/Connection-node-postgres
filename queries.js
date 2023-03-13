const { Pool } = require('pg');
// configurar la conexión a la base de datos
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'db5',
  password: 'postgres',
  port: 5706,
  idleTimeoutMillis: 2000,
  connectionTimeoutMillis: 0,
});


const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY user_id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE user_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const createUser = (request, response) => {
    const { name, email, password } = request.body
    
    pool.query(`select * from public.fn_create_user('$1', '$2', '$3'); `, [name, email, password], (error, results) => {
      if (error) {
        throw error
      }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
  }
  
  const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email, password, estatus } = request.body
  
    pool.query(
      'UPDATE user SET name = $1, email_user = $2, password = $3, status_id = $4 WHERE  user_id = $5',
      [name, email_user, password, estatus, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }
  
  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('select * from public.fn_eliminate_user($1);', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }
  


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }