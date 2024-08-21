const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const auth = require("./auth/auth");
const post_ = require("./post/post");

require("dotenv").config("./.env");

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.secretSession,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cors());

app.use("/auth", auth);
app.use("/post", post_);

app.listen(process.env.port, () => {
  console.log(`Server is listening on ${process.env.port}`);
});
