const express = require('express');
const {
  getAllKeepAlive,
  getKeepAliveById,
} = require('../controllers/keepAliveController');

const router = express.Router();

router.get('/', getAllKeepAlive);
router.get('/:id', getKeepAliveById);

module.exports = router;
