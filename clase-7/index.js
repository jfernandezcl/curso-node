import express from 'express'
import { PORT, SECRET_JWT__KEY } from './config.js'
import { UserRepository } from './user-repository.js'
import jwt from 'jasonwebtoken'

const app = express()
app.set('view engine', 'ejs')
app.use(express.json())

app.get('/', (req, res) => {
  res.render('example', { username: 'midu' })
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await UserRepository.login({ username, password })
    const token = jwt.sign({ id: user._id, username: user.username }, SECRET_JWT__KEY, {
      expiresIn: '1h'
    })
    res.send({ user })
  } catch (error) {
    res.status(401).send(error)
  }
})

app.post('/register', async (req, res) => {
  const { username, password } = req.body

  try {
    const id = await UserRepository.create({ username, password })
    res.send({ id })
  } catch (error) {
    res.status(400).send({ error })
  }
})

app.post('/logout', (req, res) => { })

app.get('/protected', (req, res) => {
  // TODO: if sesión del usuario
  res.render(('protected', { username: 'midu' }))
  // TODO: else 401
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
