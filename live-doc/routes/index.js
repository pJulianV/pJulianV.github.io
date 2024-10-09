// routes/index.js
const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

router.post('/save-form', formController.saveForm);

module.exports = router;