const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const app = express();

// app.set("view-engine", "ejs");
app.use(express.static('public'));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
  ws.on('message', message => {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        console.log('video received successfully..')
        client.send(message.toString());
      }
    });
  });
});

server.listen(8080, () => {
  console.log('Server started on port 8080');
});
