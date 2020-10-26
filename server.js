const express = require('express');
const { ExpressPeerServer } = require('peer');
const { v4: uuidV4 } = require('uuid');

const app = express();
const server = app.listen(process.env.PORT || 3030, () => console.info('Running on P:3030'));
const io = require('socket.io')(server);

const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/peerjs', peerServer);
app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room });
});

io.on('connection', (socket) => {
  socket.on('join-room', (data) => {
    console.info('New connection: ', data);
    socket.join(data.room);
    socket.to(data.room).broadcast.emit('user-connected', { user: data.user });
  });
});
