import express from 'express'
import logger from 'morgan'
import { Server } from 'socket.io'
import { createServer } from 'node:http' // modulo para crear servidores http
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

// cargar variables de entorno
dotenv.config()

const port = process.env.PORT ?? 3000

const app = express()
const server = createServer(app)
const io = new Server(server, {
  connectionStateRecovery: {}
})

// conexión a la base de datos usando varibles de entorno
const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
})

io.on('connection', async (socket) => {
  console.log('a user has connected')

  socket.on('disconnect', () => {
    console.log('an user has disconnected')
  })

  socket.on('chat message', async (msg) => {
    let result
    try {
      const username = socket.handshake.auth.username ?? 'anonymous'
      io.emit('chat message', msg, result.lastInsertRowid.toString(), username)
      result = await db.execute('INSERT INTO message (content, user) VALUES (?)', [msg, username])
    } catch (error) {
      console.error('Error saving message', error)
    }
  })

  if (!socket.recovered) { // <-- recuperar todos los mensajes sin conexión
    try {
      const results = await db.execute(
        'SELECT id, content, user FROM message WHERE id > ?',
        [socket.handshake.auth.serverOffset ?? 0]
      )

      results[0].forEach(row => {
        socket.emit('chat message', row.content, row.id.toString(), row.username)
      })
    } catch (error) {
      console.error(error)
    }
  }
})

app.use(logger('dev')) // --> dev --> Lo utilizamos en modo desarollo

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

server.listen(port, () => { // ahora ya escuchamos server y no ponemos app
  console.log(`Server running on port ${port}`)
})
