const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  governmentAuthority: { type: mongoose.Schema.Types.ObjectId, ref: 'GovernmentAuthority', required: true },
  status: { type: String, enum: ['reported', 'in progress', 'resolved'], default: 'reported' },
  createdAt: { type: Date, default: Date.now }
});

issueSchema.index({ location: '2dsphere' }); // For geospatial queries

module.exports = mongoose.model('Issue', issueSchema);
