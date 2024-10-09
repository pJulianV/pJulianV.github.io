// models/Form.js
const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  category: String,
  message: String,
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;