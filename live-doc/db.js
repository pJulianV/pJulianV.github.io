const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://pjuliandvargas:0S1fAYbY08bXqijB@cluster0.sa9c5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error de conexión:'));
db.once('open', function () {
  console.log('Conectado a MongoDB');
});