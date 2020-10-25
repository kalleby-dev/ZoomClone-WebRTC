const express = require('express');
/* const server = require('http').Server(app);
const io = require('socket.io')(server); */
const app = express();
const { v4: uuidV4 } = require('uuid');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room });
});

app.listen(process.env.PORT || 3030, () => {
  console.info('Running on port 3030 or Default');
});
