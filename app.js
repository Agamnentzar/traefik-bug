const http = require('http');
const path = require('path');
const express = require('express');
const { WebSocketServer } = require('@clusterws/cws');
const app = express();
app.use(require('errorhandler')());
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

const server = http.createServer(app);

const socket = new WebSocketServer({
  server,
  path: '/ws',
});

const data = new Uint8Array(100);

for (let i = 0; i < data.length; i++) {
  data[i] = Math.random() * 255;
}

const buffer = Buffer.from(data);

socket.on('connection', client => {
  const interval = setInterval(() => {
    client.send(buffer);
  }, 1000 / 30);

  client.on('close', () => clearInterval(interval));
  client.on('error', () => clearInterval(interval));
});

server.listen(8080, () => console.log('started'));
