// app.js
const express = require('express');
const app = express();
const db = require('./db');
const routes = require('./routes/index');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routes);

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});