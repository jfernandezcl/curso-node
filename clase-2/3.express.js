// Importar el framework de express
const express = require('express')

// Crear la aplicación
const app = express()

// El puerto que vamos a utilizar
const PORT = process.env.PORT ?? 1234

// Crear las rutas
app.get('/', (req, res) => {
	res.statusCode(200).send('<h1>Mi página</h1>')
})

// Escuchar y levantar un puerto
app.listen(PORT, () => {
	console.log(`server listening on port http://localhost:${PORT}`)
})
