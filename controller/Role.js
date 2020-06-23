const Role = require('../models/Role');
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
exports.indexRole = async (req, res) => {
  await Role.find({}, (err, data) => {
    sendResponse(res, err, data);
  });
}
exports.createRole = async (req, res) => {
  await Role.create({
      ...req.body.role,
    },
    (err, data) => {
      sendResponse(res, err, data);
    }
  );
}