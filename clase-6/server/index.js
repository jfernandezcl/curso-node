import express from 'express'
import logger from 'morgan'

import { Server } from 'socket.io'
import { createServer } from 'node:http' // modulo para crear servidores http

const port = process.env.PORT ?? 3000

const app = express()
const server = createServer(app)
const io = new Server(server)
app.use(logger('dev')) // --> dev --> Lo utilizamos en modo desarollo

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

server.listen(port, () => { // ahora ya escuchamos server y no ponemos app
  console.log(`Server running on port ${port}`)
})
