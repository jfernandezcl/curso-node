/* eslint-disable space-before-function-paren */
import mysql from 'mysql2'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'moviesdb'
}

// conectarnos
const connection = mysql.createConnection(config)

export class MovieModel {
  static async getById({ id }) {

  }

  static async create({ input }) {

  }

  static async delete({ id }) {

  }

  static async update({ id, input }) {

  }
}
