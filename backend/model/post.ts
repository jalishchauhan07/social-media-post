const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    context: {
      type: String,
    },
    externalLinks: {
      type: String,
    },
    tags: {
      type: [],
    },
    location: {
      type: Number,
    },
    images: {
      type: String,
    },
    numLikes: {
      type: Number,
    },
    numBookmarks: {
      type: Number,
    },
    numViews: {
      type: Number,
    },
  },
  { timestamps: true }
);

const post = mongoose.model("post", postSchema);
export {};
module.exports = post;
