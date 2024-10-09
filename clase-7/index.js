import express from 'express'

const app = express()

const PORT = process.env.PORT ?? 3000

app.length('/', (req, res) => {
  res.send('Hola mundo')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
