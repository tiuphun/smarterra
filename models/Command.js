// models/Command.js
const mongoose = require('mongoose');

const commandSchema = new mongoose.Schema({
  duration: {
    type: Number,
    required: false,
  },
  // Dynamic fields for actuators
  actuators: {
    type: Map,
    of: Boolean,
    required: false,
  },
});

const Command = mongoose.model('Command', commandSchema);
module.exports = Command;
