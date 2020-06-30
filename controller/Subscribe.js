// const mongoose = require('mongoose');
const Subscriber = require("../models/Subscriber");
// response function
const sendResponse = (res, err, data) => {
  if (err) {
    return res.json({
      success: false,
      message: err,
    });
  } else if (!data) {
    return res.json({
      success: false,
      message: "Not Found",
    });
  } else {
    return res.json({
      success: true,
      data: data,
    });
  }
};
exports.postSubscriber = (req, res) => {
  const subscriptionModel = new Subscriber({
    ...req.body,
    user: req.user._id,
  });

  subscriptionModel.save((err, subscription) => {
    sendResponse(res, err, subscription);
  });
};
exports.getSubscriber = (req, res) => {
  Subscriber.find({})
    .populate("user")
    .exec((err, data) => {
      sendResponse(res, err, data);
    });
};
