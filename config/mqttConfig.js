const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://broker.hivemq.com:1883', {
  username: 'emqx',
  password: 'public',
});

// MQTT Topics
const sensorTopic = 'ict66/smarterra/sensors/';
const keepAliveTopic = 'ict66/smarterra/keepalive/';
const commandTopic = 'ict66/smarterra/commands/';

// Subscribe to sensor data and keep-alive topics
client.on('connect', () => {
  console.log('Connected to MQTT broker');
  client.subscribe([sensorTopic, keepAliveTopic], (err) => {
    if (err) {
      console.error('Failed to subscribe to topics:', err.message);
    } else {
      console.log('Subscribed to topics:', sensorTopic, keepAliveTopic);
    }
  });
});

// Handle incoming messages
client.on('message', (topic, message) => {
  console.log(`Message received on ${topic}:`, message.toString());
  // Additional processing is done in controllers based on the topic
});

module.exports = {
  client,
  topics: {
    sensorTopic,
    keepAliveTopic,
    commandTopic,
  },
};
