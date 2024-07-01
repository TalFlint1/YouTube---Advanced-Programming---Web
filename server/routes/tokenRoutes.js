const express = require('express');
const router = express.Router();
const { createToken } = require('../controllers/tokenController');

// Routes
router.post('/tokens', createToken);

module.exports = router;
