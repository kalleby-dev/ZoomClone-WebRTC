const express = require('express');

const app = express();
const server = app.listen(process.env.PORT || 3030, () => {
  console.info('Running on port 3030 or Default');
});

const io = require('socket.io').listen(server);

const { v4: uuidV4 } = require('uuid');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room });
});

io.on('connection', (socket) => {
  socket.on('join-room', (room) => {
    console.info('Joined room: ', room);
    socket.join(room.id);
    socket.to(room.id).broadcast.emit('user-connected');
  });
});
