// controllers/formController.js
const Form = require('../models/Form');

exports.saveForm = async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.redirect('/'); // Redirige a la página principal
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al guardar el formulario');
  }
};