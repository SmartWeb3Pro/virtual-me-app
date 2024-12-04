const express = require('express');
const { ExpressPeerServer } = require('peer');

const app = express();

const server = app.listen(9000, () => {
  console.log('PeerJS server is running on port 9000');
});

const peerServer = ExpressPeerServer(server, {
  path: '/'
});

app.use('/peerjs', peerServer);
