const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

router.post('/users', controllers.createUser);
router.get('/users', controllers.getUsers);

module.exports = router;