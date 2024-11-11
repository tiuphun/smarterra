// controllers/sensorController.js
const SensorData = require('../models/SensorData');

// Get the latest sensor data
exports.getLatestData = async (req, res) => {
  try {
    const latestData = await SensorData.findOne().sort({ timestamp: -1 });
    if (!latestData) {
      return res.status(404).json({ message: 'No data available' });
    }
    res.json(latestData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
