const express = require('express') // require => commonJS
const movies = require('./movies.json')

const app = express()
app.disable('x-powered-by')// deshabilitar el headerx-powered-by: Express

// Todos los recursos que sean MOVIES se identifica con /movies
app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movies => movies.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
  }
  res.json(movies)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movies not found' })
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
