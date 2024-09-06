/* eslint-disable space-before-function-paren */
import { readJSON } from '../util.js'
import { randomUUID } from 'node:crypto'
const movies = readJSON('../movies.json')

export class MovieModel {
  // eslint-disable-next-line space-before-function-paren
  static async getAll({ genre }) {
    if (genre) {
      return movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
    }
    return movies
  }

  static async getById({ id }) {
    const movie = movies.find(movie => movie.id === id)
    return movie
  }

  static async create(input) {
    const newMovie = {
      id: randomUUID(),
      ...input
    }
    movies.push(newMovie)
    return newMovie
  }
}
