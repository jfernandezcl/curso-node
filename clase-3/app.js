const express = require('express') // require => commonJS
const crypto = require('node:crypto')
const movies = require('./movies.json')
const { validateMovie } = require('./shemas/movies')

const app = express()
app.use(express.json())
app.disable('x-powered-by')// deshabilitar el headerx-powered-by: Express

// Todos los recursos que sean MOVIES se identifica con /movies
app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movies => movies.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }
  res.json(movies)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movies not found' })
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(400).json({ error: result.error.message })
  }

  const newMovies = {
    id: crypto.randomUUID(), // uuid v 4
    ...result.data
  }

  // Esto no sería REST, porque estamos guardando
  // el estado de la aplicación en memoria
  movies.push(newMovies)

  res.status(201).json(newMovies)
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
