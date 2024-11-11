// models/Command.js
const mongoose = require('mongoose');

const commandSchema = new mongoose.Schema({
  fan: Boolean,
  duration: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Command', commandSchema);
