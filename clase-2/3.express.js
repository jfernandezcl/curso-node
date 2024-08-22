const express = require('express')
const ditto = require('./pokemon/ditto.json')

// Crear la aplicación
const app = express()
app.disable('x-powered-by')

// app.use((req, res, next) => {
// console.log('mi primer middleware)
// --> trakear la request a la base de datos
// --> revisar si el usuario tiene cookies
// next()
// })

app.use((req, res, next) => {
  next()
})

// El puerto que vamos a utilizar
const PORT = process.env.PORT ?? 1234

// Crear las rutas
app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  let body = ''

  // escuchar el evento data
  req.on('data', chunk => {
    body += chunk.toString()
  })

  // ya estaría terminado y lo parseamos en el body
  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    res.status(201).json(data)
  })
})

// La última a la que va a llegar
app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

// Escuchar y levantar un puerto
app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
