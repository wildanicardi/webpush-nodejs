const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const bodyParser = require("body-parser");
const port = 8000;
const app = express();
const keys = require('./configuration/keys');

app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`server is listening on port:${port}`);
});

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => console.log("MongoDB Connected")).catch((err) => console.log(err));

const passport = require('passport');
const passportConf = require('./passport');
const passportLogin = passport.authenticate('local', {
  session: false
});
const passportJwt = passport.authenticate('jwt', {
  session: false
});
const {
  signup,
  login
} = require('./controller/Auth');
const {
  index,
  deleteUser,
  updateUser,
  showUser,
  createUser
} = require('./controller/Users');
const {
  createRole,
  indexRole
} = require("./controller/Role");
const {
  indexSubscriber,
  getSubscriber
} = require("./controller/Subscribe");
const {
  indexPush
} = require("./controller/Push");
// const Subscribe = require("./models/Subscriber");
//login
app.post("/auth/login", passportLogin, login);
// register
app.post("/auth/signup", signup);
// CREATE
app.post("/users", createUser);
app.get("/users", passportJwt, index);
app
  .route("/users/:id")
  // READ
  .get(passportJwt, showUser)
  // UPDATE
  .put(passportJwt, updateUser)
  // DELETE
  .delete(passportJwt, deleteUser);
app.post("/roles", passportJwt, createRole);
app.get("/roles", passportJwt, indexRole);
app.get("/", (req, res) => {
  res.send("Hello World");
})

app.get("/subscribe", passportJwt, getSubscriber);
app.post("/subscribe", passportJwt, indexSubscriber);

app.post("/push", passportJwt, indexPush);