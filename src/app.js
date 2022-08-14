const { join } = require('path');
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const environment = require('./config/environment');
const { AuthRoutes, RoomRoutes } = require('./routes');

class App {
  constructor(router) {
    this.app = express();
    this.env = environment.nodeEnv;
    this.initializeMiddlewares();
    this.initializeRoutes(router);
    this.app.use(
      express.static(join(__dirname, '..', 'build', environment.nodeEnv))
    );
    this.app.all('*', (req, res) =>
      res.sendFile(
        join(__dirname, '..', 'build', environment.nodeEnv, 'index.html')
      )
    );
  }

  initializeMiddlewares() {
    this.app.use(compression());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.disabled('x-powered-by');
  }

  initializeRoutes(routes) {
    routes.forEach((route) => {
      this.app.use('/api/v1', route);
    });
  }
}

const { app } = new App([AuthRoutes, RoomRoutes]);

module.exports = app;
