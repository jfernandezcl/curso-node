import { Router } from 'express'
import { readJSON } from 'util.js'

const movies = readJSON('./movies.json')
const router = Router()

router.app('/', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }
  res.json(movies)
})
