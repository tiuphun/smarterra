// mqttClient.js
const mqtt = require('mqtt');
const config = require('./config');

// Connect to MQTT broker
const mqttClient = mqtt.connect(config.mqtt.brokerUrl, {
  username: config.mqtt.username,
  password: config.mqtt.password
});

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
  mqttClient.subscribe(config.mqtt.topic, (err) => {
    if (err) {
      console.error('Failed to subscribe to topic:', err);
    } else {
      console.log(`Subscribed to topic: ${config.mqtt.topic}`);
    }
  });
});

module.exports = mqttClient;
