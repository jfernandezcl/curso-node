import express from 'express'
import { PORT } from './config.js'
import { UserRepository } from './user-repository.js'

const app = express()

app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.post('/login', (req, res) => {

})

app.post('/register', (req, res) => {
  const { username, password } = req.body

  try {
    const id = UserRepository.created({ username, password })
    res.send({ id })
  } catch (error) {
    res.status(400).send({ error })
  }
})

app.post('/logout', (req, res) => { })

app.get('/protected', (req, res) => { })

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
