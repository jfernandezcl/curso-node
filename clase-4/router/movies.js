import { Router } from 'express'
import { validatePartialMovie } from '../schemas/movies.js'
import { MovieModel } from '../models/movie.js'
import { MovieController } from '../controllers/movies.js'

export const moviesRouter = Router()

moviesRouter.get('/', MovieController.getAll)

moviesRouter.get('/:id', MovieController.getById)

moviesRouter.post('/', MovieController.create)

moviesRouter.delete('/:id', MovieController.delete)

moviesRouter.patch('/:id', async (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const updateMovie = await MovieModel.update({ id, input: result.data })

  return res.json(updateMovie)
})
