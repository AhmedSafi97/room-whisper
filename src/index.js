const http = require('http');
const socketIO = require('socket.io');
const environment = require('./config/environment');
const dbConnect = require('./database/dbConnection');
const app = require('./app');
const ioHandler = require('./io');

const port = environment.port || 4000;

const server = http.createServer(app);
const io = socketIO(server);

dbConnect()
  .then(() => io.on('connection', ioHandler(io)))
  .then(() =>
    server.listen(port, () =>
      // eslint-disable-next-line no-console
      console.log(`server is running http://localhost:${port}`)
    )
  )
  .catch(console.log);
