const mongoose = require('mongoose');

const governmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String}, // e.g., city, district
  // location: { type: String, required: true }, // e.g., city, district
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GovernmentAuthority', governmentSchema);
