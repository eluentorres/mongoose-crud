const express = require('express');
const { dbConnection } = require('./config/config');
const usersRoutes = require('./routes/users.js');

const app = express();
const PORT = 8080;

app.use(express.json());

console.log('Tipo de usersRoutes:', typeof usersRoutes);

app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

app.use('/', usersRoutes);

dbConnection();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});