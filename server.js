const express = require('express');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();

const app = express();
const PORT = process.env.PORT || 8080;
const REPLIT_SERVER_URL = 'https://ascii-cam-conurfloki.repl.co'; // Reemplaza con la URL correcta de tu servidor en Replit

app.use((req, res) => {
  proxy.web(req, res, { target: REPLIT_SERVER_URL });
});

app.listen(PORT, () => {
  console.log(`Servidor proxy escuchando en el puerto ${PORT}`);
});