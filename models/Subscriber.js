const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriberSchema = new Schema({
  endpoint: {
    type: String
  },
  expirationTime: {
    type: String,
  },
  keys: {
    auth: String,
    p256dh: String
  },
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }]
});

module.exports = mongoose.model('Subscribers', SubscriberSchema);