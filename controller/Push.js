const Subscription = require('../models/Subscriber');
const webPush = require('web-push');
const q = require('q');
const keys = require('../configuration/keys');

webPush.setVapidDetails(
  'mailto:aliwildan12@gmail.com',
  keys.publicKey,
  keys.privateKey
)
exports.indexPush = (req, res) => {
  const payload = {
    title: req.body.title,
    message: req.body.message,
    icon: req.body.icon
  };
  Subscription.find({}, (err, subscriptions) => {
    if (err) {
      console.error(`Error occurred while getting subscriptions`);
      res.status(500).json({
        error: 'Technical error occurred'
      });
    } else {
      let parallelSubscriptionCalls = subscriptions.map(subscription => {
        return new Promise((resolve, reject) => {
          const pushSubscription = {
            endpoint: subscription.endpoint,
            expirationTime: subscription.expirationTime,
            keys: {
              auth: subscription.keys.auth,
              p256dh: subscription.keys.p256dh
            }
          }
          const pushPayload = JSON.stringify(payload);
          webPush.sendNotification(pushSubscription, pushPayload, {}).then((result) => {
            resolve({
              status: true,
              endpoint: subscription.endpoint,
              data: result
            });
          }).catch((err) => {
            reject({
              status: false,
              endpoint: subscription.endpoint,
              data: err.message
            })
          })
        })
      });
        q.allSettled(parallelSubscriptionCalls).then((pushResult) => {
          console.log(pushResult);
        })
        res.json({
          data: 'Push Triggered'
        })
    }
  });
};