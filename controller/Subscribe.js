const Subscriber = require('../models/Subscriber');
// response function
const sendResponse = (res, err, data) => {
  if (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  } else if (!data) {
    res.json({
      success: false,
      message: 'Technical Error occured',
    });
  } else {
    res.status(200).json({
      success: true,
      data: data,
    });
  }
}
exports.subscriber = async (req, res) => {
  const subscriptionModel = new Subscriber(req.body);
  console.log("data", req.body);

  subscriptionModel.save((err, subscription) => {
    sendResponse(res, err, subscription);
  });
}