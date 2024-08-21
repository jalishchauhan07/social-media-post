const router = require("express").Router();
const User = require("../model/user");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).send({ message: "Email is Required" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is Required" });
    }
    const userInfo = await User.findOne({ email: email });
    if (!userInfo) {
      return res.status(400).send({ message: "Please Check your Email" });
    }
    const hash = await bcrypt.compare(password, userInfo.password);
    if (!hash) {
      return res.status(400).send({ message: "Please Check your password" });
    } else {
      const { clientID, clientSecretKey } = userInfo;
      const accessToken = jwt.sign(
        { clientID, clientSecretKey, email },
        process.env.key
      );
      await User.updateOne({ email }, { $push: { loginToken: accessToken } });
      return res.status(200).send({ accessToken: accessToken });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/register", async (req: any, res: any) => {
  try {
    const { username, name, password, email } = req.body;
    const cipher = crypto.createCipher("aes128", process.env.key);
    const hashPassword = await bcrypt.hash(password, 10);
    const clientID = cipher.update(JSON.stringify({ username, email }), "hex");
    clientID + cipher.final("hex");
    const clientSecretKey = cipher.update(
      JSON.stringify({ clientID, username, email }),
      "hex"
    );
    clientSecretKey + cipher.final("hex");

    if (username && name && hashPassword && email) {
      const userInfo = await User({
        username,
        name,
        password: hashPassword,
        email,
        clientID,
        clientSecretKey,
      }).save();
      if (userInfo != null || userInfo != undefined) {
        return res.status(200).send({ message: "Data successfully saved" });
      }
    } else {
      return res.status(400).send({ message: "Fill required Field" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

export {};
module.exports = router;
