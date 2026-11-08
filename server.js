const http = require("http");
const fs = require("fs").promises;

const server = http.createServer(async (req, res) => {
  res.setHeader("Content-type", "text/plain; charset=utf-8");
  res.statusCode = 200;
  try {
    if (req.url === "/imagen" && req.method === "GET") {
      const img = await fs.readFile("torchic.png");
      res.setHeader("Content-Type", "image/png");
      res.end(img);
    }
  } catch (err) {
    if (err.code === "ENOET") {
      res.statusCode = 404;
      res.end("La pagina o el archivo no fue encontrado.");
    } else {
      res.statusCode = 500;
      res.end("Error interno del servidor");
    }
  }
});

server.listen(3000, () => {
  console.log("Escuchando en el puerto 3000");
});
