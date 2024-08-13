const fs = require("node:fs");
const path = require("node:path");

const folder = process.argv[2] ?? ".";

async function ls(folder) {
  let files;
  try {
    files = await fs.readdir(folder);
  } catch {
    console.error(`No se puede leer el directorio ${folder}`);
    process.exit(1);
  }

  const filesPromises = files.map(
    async((file) => {
      const filePath = path.join(folder, file);
    })
  );
}
