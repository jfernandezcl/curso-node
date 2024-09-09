/* eslint-disable space-before-function-paren */
import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'moviesdb'
}

// conectarnos
const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getById({ id }) {
    const result = await connection.query(
      'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;'
    )
    console.log(result)
  }

  static async create({ input }) {

  }

  static async delete({ id }) {

  }

  static async update({ id, input }) {

  }
}
