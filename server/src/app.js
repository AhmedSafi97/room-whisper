require('dotenv').config();
require('./database/dbConnection');

const { join } = require('path');

const express = require('express');
const compression = require('compression');

const router = require('./router');

const app = express();

app.disabled('x-powered-by');

app.set('port', process.env.PORT || 4000);

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', router);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '..', '..', 'client', 'build')));
  app.all('*', (req, res) =>
    res.sendFile(join(__dirname, '..', '..', 'client', 'build', 'index.html'))
  );
}

module.exports = app;
