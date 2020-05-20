const { app, server } = require('./app');

const port = app.get('port');

server.listen(port, () =>
  // eslint-disable-next-line no-console
  console.log(`server is running http://localhost:${port}`)
);
