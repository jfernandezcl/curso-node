// Barra separadora de carpetas según SO
const path = require("node:path");
console.log(path.sep);

// Unir las rutas con el path.join
const filePath = path.join("content", "subfolder", "test.txt");
console.log(filePath);

//Nombre del fichero
const base = path.basename("/tmp/midu-files/password.txt");
console.log(base);
const fileName = path.basename("/tmp/midu-files/password.txt", ".txt");
console.log(fileName);

// Para obtener la extensión
const extension = path.extname("images.jpg");
console.log(extension);
