const User = require("../model/user");

const authorization = async (req: any, res: any, next: any) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .send({ message: "Not authorized to access the post" });
    }
    const userInfo = await User.findOne({ $in: { loginToken: token } });
    if (!userInfo) {
      return res
        .status(401)
        .send({ message: "Not authorized to access the post" });
    } else {
      req.user_id = userInfo._id;
      next();
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = authorization;
