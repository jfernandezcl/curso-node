const fs = require("node:fs");

fs.readdir(".", (err, files) => {
  if (err) {
    console.log("No se encuentra el directorio...");
    return;
  }

  files.forEach((file) => {
    console.log(file);
  });
});
