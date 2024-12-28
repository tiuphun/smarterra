const express = require('express');
const {
  getAllKeepAlive,
  getKeepAliveById,
  postKeepAlive,
} = require('../controllers/keepAliveController');

const router = express.Router();

router.get('/', getAllKeepAlive);
router.post('/', postKeepAlive);
router.get('/:id', getKeepAliveById);

module.exports = router;
