// Importar el framework de express
const express = require('express')

// Crear la aplicación
const app = express()

// El puerto que vamos a utilizar
const PORT = process.env.PORT ?? 1234

// Crear las rutas
app.get('/', (req, res) => {
  res.send('<h1>Mi página</h1>')
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
