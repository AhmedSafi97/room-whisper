require('dotenv').config();
require('./database/dbConnection');

const http = require('http');
const { join } = require('path');

const express = require('express');
const socketIO = require('socket.io');

const compression = require('compression');
const cookieParser = require('cookie-parser');

const router = require('./router');
const ioHandler = require('./io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.disabled('x-powered-by');

app.set('port', process.env.PORT || 4000);

app.use(cookieParser());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', router);

io.on('connection', (socket) => ioHandler(socket, io));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '..', '..', 'client', 'build')));
  app.all('*', (req, res) =>
    res.sendFile(join(__dirname, '..', '..', 'client', 'build', 'index.html'))
  );
}

module.exports = { app, server };
