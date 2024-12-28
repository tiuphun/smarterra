const KeepAlive = require('../models/keepAlive');  // Import the model

exports.getAllKeepAlive = async (req, res) => {
  try {
    const keepAlives = await KeepAlive.find();
    res.status(200).json(keepAlives);
  } catch (error) {
    res.status(500).json({ error: 'Server error while retrieving keep-alive data' });
  }
};

exports.getKeepAliveById = async (req, res) => {
  try {
    const { id } = req.params;
    const keepAlive = await KeepAlive.findOne({ Id: id });
    if (!keepAlive) {
      return res.status(404).json({ message: 'Keep-alive data not found' });
    }
    res.status(200).json(keepAlive);
  } catch (error) {
    res.status(500).json({ error: 'Server error while retrieving keep-alive data' });
  }
};