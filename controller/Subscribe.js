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
}
exports.indexSubscriber = (req, res) => {
  const subscriptionModel = new Subscriber({
    ...req.body,
    user: [{
      "_id": "5eee22e1d2342c0b8431e26f",
      "email": "ali@mail.com",
      "name": "ali",
    }]
  });

  subscriptionModel.save((err, subscription) => {
    sendResponse(res, err, subscription);
  });
}
exports.getSubscriber = (req, res) => {
  return res.send("Berhasil");
}