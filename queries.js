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

const createUser = async (request, response) => {
  const res = '';
  const { name, email, password } = request.headers;
  const query = `select * from public.fn_create_user('${name}', '${email}', '${password}'); `;
  console.log(name + '' + email + password);
  try {
    const ress = await pool.query(query).then(() => {
      console.log("ok")
    })
      .catch(error => {
        console.log(error)
      });
    response.status(201).send(`User added with ID: ${res[0]}`)
  }
  catch (e) {
    console.log(e)
  }
}

// const UserbyEmail = async (req, res, netx) => {
//   const email = (request.headers.email)
//   const query = `select * from public.fn_getEmail_user($1)`;
//   try {
//     const ress = await pool.query(query, [data]).then(() => {
//       console.log("ok")
//     })
//       .catch(error => {
//         console.log(error)
//       });
//     response.status(201).send(`User added with ID: ${res[0]}`)
//     netx();
//   }
//   catch (e) {
//     console.log(e)
//   }
// }

const updateUser = async (request, response) => {
  const res = '';
  const id = parseInt(request.params.id);
  const { name, email_user, password, estatus } = request.body;
  const query = `select * from public.fn_update_user(${id},'${name.toString()}', '${email_user.toString()}', '${password.toString()}',${parseInt(estatus)});`
  // const query = 'UPDATE user SET name = $1, email_user = $2, password = $3, status_id = $4 WHERE  user_id = $5';
  try {
    const ress = await pool.query(query).then(() => {
      console.log("ok")
    })
      .catch(error => {
        console.log(error)
      });
    response.status(201).send(`User added with ID: ${res[0]}`)
   
  }
  catch (e) {
    console.log(e)
  }
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