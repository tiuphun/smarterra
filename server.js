// server.js
const express = require('express');
const mqtt = require('mqtt');
const mongoose = require('mongoose');
const config = require('./config');

// Initialize Express app
const app = express();
app.use(express.json());

const sensorRoutes = require('./routes/sensorRoutes');
app.use('/api/sensors', sensorRoutes);
const commandRoutes = require('./routes/commandRoutes');
app.use('/api/commands', commandRoutes);

// Connect to MongoDB
mongoose.connect(config.mongodb.uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

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

// Handle incoming MQTT messages
const SensorData = require('./models/SensorData');

// Inside mqttClient.on('message') in server.js
mqttClient.on('message', async (topic, message) => {
    console.log(`Received message on ${topic}: ${message.toString()}`);
    
    try {
      const data = JSON.parse(message.toString());
      
      // Save sensor data to MongoDB
      const sensorData = new SensorData({
        temperature: data.temperature,
        humidity: data.humidity,
        moisture: data.moisture
      });
      
      await sensorData.save();
      console.log('Sensor data saved:', sensorData);
    } catch (error) {
      console.error('Error parsing or saving sensor data:', error);
    }
  });

// Publish commands to the MQTT broker upon API request
// Import the MQTT client in the command controller
module.exports = mqttClient;

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
