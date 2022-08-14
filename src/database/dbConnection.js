const mongoose = require('mongoose');
const environment = require('../config/environment');

const { uri: dbUri } = environment.database;

if (!dbUri) throw new Error('database url was not found');

const dbConnect = () =>
  mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = dbConnect;
