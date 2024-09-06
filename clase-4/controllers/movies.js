/* eslint-disable space-before-function-paren */
import { MovieModel } from '../models/movie'

export class MovieController {
  static async getAll(req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    // Que es lo que renderiza?
    res.json(movies)
  }
}
