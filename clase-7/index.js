import express from 'express'
import { PORT, SECRET_JWT__KEY } from './config.js'
import { UserRepository } from './user-repository.js'
import jwt from 'jasonwebtoken'
import cookieParser from 'cookie-parser'

const app = express()
app.set('view engine', 'ejs')
app.use(express.json())
app.use(cookieParser())

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
    res
      .cookie('access_token', token, {
        httpOnly: true, // la cookie solo se puede acceder en el servidor
        secure: process.env.NODE_ENV === 'production', // la cookie solo puede acceder en https
        sameSite: 'strict', // la cookie solo se puede acceder en el mismo dominio
        maxAge: 1000 * 60 * 60 // la cookie tiene un tiempo de validez de 1 hora
      })
      .send({ user })
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
