const http = require('node:http')

const server = http.createServer((req, res) => {
  console.log('request received')
  res.end('Hola mundo')
})

server.listen(1234, () => {
  console.log('server listening on port 1234')
})
