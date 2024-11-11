// routes/sensorRoutes.js
const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

router.get('/latest', sensorController.getLatestData);

module.exports = router;
