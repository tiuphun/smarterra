// controllers/commandController.js
const Command = require('../models/Command');
const mqttClient = require('../mqttClient');
const config = require('../config')

exports.sendCommand = async (req, res) => {
  const { fan, duration } = req.body;

  // Save the command in MongoDB
  const command = new Command({ fan, duration });
  await command.save();

  // Publish the command to the MQTT broker
  mqttClient.publish(config.mqtt.topic, JSON.stringify({ fan, duration }), (err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to send command', error: err });
    }
    res.json({ message: 'Command sent successfully', command });
  });
};
