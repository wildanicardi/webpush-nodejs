const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 8000;
const app = express();
const connectionDb = require("./configuration/db");

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());
app.listen(port, () => {
  console.log(`server is listening on port:${port}`);
});
connectionDb();

const passport = require("passport");
const passportConf = require("./passport");
const passportLogin = passport.authenticate("local", {
  session: false,
});
const passportJwt = passport.authenticate("jwt", {
  session: false,
});
const { signup, login } = require("./controller/Auth");
const {
  index,
  deleteUser,
  updateUser,
  showUser,
  createUser,
} = require("./controller/Users");
const { postSubscriber, getSubscriber } = require("./controller/Subscribe");
const { postPush } = require("./controller/Push");
// const Subscribe = require("./models/Subscriber");
//login
app.post("/api/auth/login", passportLogin, login);
// register
app.post("/api/auth/signup", signup);
// CREATE
app.post("/api/users", createUser);
app.get("/api/users", passportJwt, index);
app
  .route("/api/users/:id")
  // READ
  .get(passportJwt, showUser)
  // UPDATE
  .put(passportJwt, updateUser)
  // DELETE
  .delete(passportJwt, deleteUser);
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/subscribe", passportJwt, getSubscriber);
app.post("/subscribe", passportJwt, postSubscriber);

app.post("/api/push", passportJwt, postPush);
