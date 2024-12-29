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

exports.postKeepAlive = async (req, res) => {
  try {
    const newKeepAlive = new KeepAlive(req.body);
    await newKeepAlive.save();

    // Publish the keep-alive data to the keepAliveTopic
    const keepAliveMessage = JSON.stringify(req.body);
    client.publish(topics.keepAliveTopic, keepAliveMessage, (err) => {
      if (err) {
        console.error('Error publishing keep-alive data:', err.message);
        return res.status(500).json({ error: 'Failed to send keep-alive data to broker' });
      }
      console.log('Keep-alive data published:', keepAliveMessage);
    });

    res.status(201).json(newKeepAlive);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};