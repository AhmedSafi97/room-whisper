const server = require('./app');

const port = process.env.PORT || 4000;

server.listen(port, () =>
  // eslint-disable-next-line no-console
  console.log(`server is running http://localhost:${port}`)
);
