const router = require("express").Router();
const post = require("../model/post");
const { ConnectMQtt, sendData } = require("../controller/mqtt");

let channel: any;
// (async () => {
//   channel = await ConnectMQtt();
// })();

router.post("/", require("../middleware/auth"), async (req: any, res: any) => {
  try {
    setTimeout(async () => {
      const {
        title,
        message = undefined,
        context = undefined,
        tags = undefined,
        location = undefined,
        images = undefined,
        externalLinks = undefined,
        numLikes = 0,
        numBookmarks = 0,
        numViews = 0,
        user_id = undefined,
      } = req.body;

      if (channel != undefined) {
        sendData(channel, {
          title,
          message,
          context,
          tags,
          externalLinks,
          location,
          images,
          numLikes,
          numBookmarks,
          numViews,
          userId: user_id,
        });
        const postInfo = await post({
          title,
          message,
          context,
          tags,
          externalLinks,
          location,
          images,
          numLikes,
          numBookmarks,
          numViews,
        }).save();
        if (postInfo) {
          return res
            .status(200)
            .send({ message: "Successfully post is created" });
        } else {
          return res.status(400).send({ message: "Something went wrong" });
        }
      }
    }, 500);
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post(
  "/count",
  require("../middleware/auth"),
  async (req: any, res: any) => {
    try {
      const { user_id } = req.body;
      const totalPost = await post.count({ userId: user_id });
      return res.status(200).send({ totalPost: totalPost });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }
);
export {};
module.exports = router;
