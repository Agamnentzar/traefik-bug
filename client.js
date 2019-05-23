const { WebSocket } = require('@clusterws/cws');

var sent = 0;
var recv = 0;
var openn = 0;

function open() {
  var data = new Uint8Array(100);

  for (let i = 0; i < data.length; i++) {
    data[i] = Math.random() * 255;
  }

  var socket = new WebSocket('ws://localhost/ws');
  socket.binaryType = 'arraybuffer';
  socket.onopen = () => {
    console.log('opened');
    openn++;
  };
  socket.onclose = () => {
    console.log('closed');
    openn--;
  };
  socket.onmessage = message => {
    socket.send(data);
    recv += message.byteLength;
    sent += data.length;
  };
}

for (let i = 0; i < 1000; i++) {
  open();
}

setInterval(() => console.log(
  'sent ' + (sent / (1024 * 1024)).toFixed(0) + ' MB, ' +
  'received ' + (recv / (1024 * 1024)).toFixed(0) + ' MB, '+
  'open ' + openn), 1000);
