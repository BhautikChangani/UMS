const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'UMS',
    password: 'bhautik123',
    port: 5432
});

client.connect(function(err) {
    if(err) throw err;
    console.log("Database connected successfully !!");
});

const getAllUser = (req, res) => {
    client.query('SELECT * FROM users ORDER BY id ASC', (error, result) => {
        if(error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
}
const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    client.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      console.log(results.rowCount);
      if(results.rowCount > 0){
          response.status(200).json(results.rows)
      } else {
        response.status(404).json("User not found");
      }
    })
  }
  
  const createUser = (request, response) => {
    const { name } = request.body
  
    client.query('INSERT INTO users (name) VALUES ($1)', [name], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.insertId}`)
    })
  }
  
  const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name } = request.body
  
    client.query(
      'UPDATE users SET name = $1 WHERE id = $2',
      [name, id],
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
  
    client.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }
  
  module.exports = {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }