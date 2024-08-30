const express = require('express') // require => commonJS
const movies = require('./movies.json')

const app = express()
app.disable('x-powered-by')// deshabilitar el headerx-powered-by: Express

// Todos los recursos que sean MOVIES se identifica con /movies
app.get('/movies', (req, res) => {
  res.json(movies)
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
