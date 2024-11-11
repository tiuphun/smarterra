// controllers/commandController.js
const Command = require('../models/Command');
const mqttClient = require('../mqttClient');  // Import MQTT client
const config = require('../config'); // Import config

exports.sendCommand = async (req, res) => {
  const { duration, ...actuators } = req.body; // Separate duration from actuators
  
  // Validate that at least one actuator (fan, pump, etc.) is provided
  if (Object.keys(actuators).length === 0) {
    return res.status(400).json({ message: 'At least one actuator (e.g., fan, pump) must be provided.' });
  }

  // Save the command in MongoDB, including the actuators dynamically
  const command = new Command({ ...actuators, duration });
  await command.save();

  // Publish the command to the MQTT broker
  mqttClient.publish(config.mqtt.commandTopic, JSON.stringify({ ...actuators, duration }), (err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to send command', error: err });
    }
    res.json({ message: 'Command sent successfully', command: { ...actuators, duration } });
  });
};
