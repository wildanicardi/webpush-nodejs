const mongoose = require("mongoose");
const keys = require("../configuration/keys");

const connectionDb = async () => {
  mongoose
    .connect(keys.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
};
module.exports = connectionDb;
