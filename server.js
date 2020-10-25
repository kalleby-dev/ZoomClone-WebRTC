const app = require('express')();
/* const server = require('http').Server(app);
const io = require('socket.io')(server); */

app.get('/', (req, res) => {
  res.send('HelloWorld');
});

app.listen(process.env.PORT || 3030, () => {
  console.info('Running on port 3030 or Default');
});
