const express = require('express')
const ditto = require('./pokemon/ditto.json')

// Crear la aplicación
const app = express()

// para desactivar la cabecera de express
app.disable('x-powered-by')

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

// Escuchar y levantar un puerto
app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
