const events = require('events');
const net = require('net');
const channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};
channel.setMaxListeners(50);

channel.on('join', function(id, client) { // Join standart event, get 2 arguments from join call
  const welcome = `
  Welcome!
    Guests online: ${this.listeners('broadcast').length}
  `;
  client.write(`${welcome}\n`);

  this.clients[id] = client; // save current client in data array
  this.subscriptions[id] = (senderId, message) => { // get 2 arguments from 'broadcast' and process logic with this
    // console.log(senderId);
    // console.log(message);
    // console.log(id);

    if (id != senderId) { // Write new message to other users
      this.clients[id].write(message);
    }
  };
  this.on('broadcast', this.subscriptions[id]); // Call this.subscriptions[id] and send 2 arguments

  // this.on('broadcast', (senderId, message) => {
  //   console.log(senderId);
  //   console.log(message);
  //   console.log(id);

  //   if (id != senderId) {
  //     console.log('RUSLAN');
  //     this.clients[id].write(message);
  //   }
  // });
});

channel.on('leave', function(id) {
  channel.removeListener(
    'broadcast', this.subscriptions[id]
  );
  channel.emit('broadcast', id, `${id} has left the chatroom.\n`);
});

const server = net.createServer(client => {
  const id = `${client.remoteAddress}:${client.remotePort}`;
  channel.emit('join', id, client); // Call join and send 2 arguments
  client.on('data', data => {
    data = data.toString();
    console.log(data);
    // if (data === 'shutdown\r\n') {
    if (data.includes('shutdown')) {
      channel.emit('shutdown');
    }
    channel.emit('broadcast', id, data); // Call broadcast and send 2 arguments
  });
  client.on('close', () => {
    channel.emit('leave', id);
  });
  channel.on('shutdown', () => {
    channel.emit('broadcast', '', 'The server has shut down.\n');
    channel.removeAllListeners('broadcast');
  });
});
server.listen(8888);

