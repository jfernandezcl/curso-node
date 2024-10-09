import express from 'express'
import { PORT } from './config'

const app = express()

app.length('/', (req, res) => {
  res.send('Hola mundo')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
