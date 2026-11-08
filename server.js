const http = require("http");
const { stringify } = require("querystring");
const fs = require("fs").promises;

const server = http.createServer(async (req, res) => {
  res.setHeader("Content-type", "text/plain; charset=utf-8");
  res.statusCode = 200;
  try {
    if (req.url === "/imagen" && req.method === "GET") {
      const img = await fs.readFile("torchic.png");
      res.setHeader("Content-Type", "image/png");
      res.end(img);
    } else if (req.url === "/data" && req.method === "POST") {
      const poke = {
        nombre: "torchic",
        tipo: "fuego",
      };
      const pokeJson = JSON.stringify(poke, null, 2);
      await fs.writeFile("./data.json", pokeJson, "utf8");
      res.statusCode = 201;
      res.end("Archivo modificado o creado correctamente");
    } else if (req.url === "/update" && req.method === "PUT") {
      await fs.writeFile(
        "./info.txt",
        "Hermética - Atravesando todo limite",
        "utf8",
      );
      res.statusCode = 201;
      res.end("Archivo actualizado correctamente");
    } else if (req.url === "/mensaje" && req.method === "DELETE") {
      await fs.unlink("./message.txt");
      res.end("El archivo se borro de manera exitosa");
    } else {
      res.statusCode = 404;
      res.end("Ruta no encontrada");
    }
  } catch (err) {
    if (err.code === "ENOENT") {
      res.statusCode = 404;
      res.end("El archivo no fue encontrado.");
    } else {
      res.statusCode = 500;
      res.end("Error interno del servidor");
    }
  }
});

server.listen(3000, () => {
  console.log("Escuchando en el puerto 3000");
});
