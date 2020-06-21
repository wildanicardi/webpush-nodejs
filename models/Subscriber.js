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
});

mongoose.model('Subscribers', SubscriberSchema, 'subscribers');