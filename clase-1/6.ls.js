// Uso de fs con promesas
const fs = require('node:fs/promises')

fs.readdir('.')
  .then((files) => {
    files.forEach((file) => {
      console.log(file)
    })
  })
  .catch((err) => {
    if (err) {
      console.log('Error al leer el directorio...')
    }
  })

// Uso de fs con callback

// const fs = require("node:fs");
// fs.readdir(".", (err, files) => {
// if (err) {
// console.log("No se encuentra el directorio...");
// return;
// }

// files.forEach((file) => {
// console.log(file);
// });
// });
