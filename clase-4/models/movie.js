import { readJSON } from '../util.js'
const movies = readJSON('../movies.json')

export class MovieModel {
  // eslint-disable-next-line space-before-function-paren
  static getAll({ genre }) {
    if (genre) {
      return movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
    }
    return movies
  }
}
