const mongoose = require('mongoose');
const dns = require('node:dns');
require('dotenv').config();

dns.setServers(['1.1.1.1', '8.8.8.8']);

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Base de datos conectada con éxito');
  } catch (error) {
    console.error('Error de conexión:', error.message);
  }
};

module.exports = {
  dbConnection
};