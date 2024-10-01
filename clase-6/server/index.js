import express from 'express'
import logger from 'morgan'

const port = process.env.PORT ?? 3000

const app = express()
app.use(logger('dev')) // --> dev --> Lo utilizamos en modo desarollo

app.get('/', (req, res) => {
  res.end('<h1> Esto es el chat</h1>')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
