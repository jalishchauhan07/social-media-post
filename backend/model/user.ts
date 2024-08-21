import { timeStamp } from "console";

const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    accessToken: {
      type: String,
    },
    loginToken: {
      type: [],
      required: true,
    },
    clientID: {
      type: String,
      required: true,
    },
    clientSecretKey: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);

export {};
module.exports = user;
