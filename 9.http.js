const http = require('node:http')

const server = http.createServer((req, res) => {
  console.log('request received')
  res.end('Hola mundo')
})
