import express from 'express'

const port = process.env.PORT ?? 3000

const app = express()

app.get('/', (req, res) => {
  res.end('<h1> Esto es el chat</h1>')
})
