const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller');

router.post('/auth', authController.registerAndLogin);

module.exports = router;
