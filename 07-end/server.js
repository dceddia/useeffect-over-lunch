// Example adapted from https://github.com/websockets/ws

const WebSocket = require('ws');

const PORT = process.env.PORT || 8080;

function noop() {}

function heartbeat() {
  this.isAlive = true;
}

const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', function connection(ws) {
  console.log('Client connected');
  ws.isAlive = true;
  ws.on('pong', heartbeat);
});

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping(noop);

    const data = "now: " + Date.now();
    ws.send(data);
    console.log('Sent', data);
  });
}, 1000);

wss.on('close', function close() {
  console.log('Client disconnected');
  clearInterval(interval);
});

console.log(`Started websocket server on port ${PORT}`);
