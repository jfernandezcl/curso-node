// Barra separadora de carpetas según SO
const path = require("node:path");
console.log(path.sep);

// Unir las rutas con el path.join
const filePath = path.join("content", "subfolder", "test.txt");
console.log(filePath);
