import DBlocal from 'db-local'
import crypto from 'node:crypto'
import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from './config.js'

const { Schema } = new DBlocal({ path: './db' })

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
})

export class UserRepository {
  static async create({ username, password }) {
    // validaciones de username
    if (typeof username !== 'string') throw new Error('username must be a string')
    if (username.length < 3) throw new Error('username must be at least 3 characters long')

    if (typeof password !== 'string') throw new Error('password must be a string')
    if (password.length < 6) throw new Error('password must be at least 6 characters long')

    // asegurar que username no existe
    const user = User.findOne({ username })
    if (user) throw new Error('username already exists')

    const id = crypto.randomUUID()
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    User.create({
      _id: id,
      username,
      password: hashedPassword
    }).save()
    return id
  }
  static login({ username, password }) { }
}