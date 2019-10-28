const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");
const User = require("../models/user");

router.post("/user/signup", async (req, res) => {
  try {
    const { password, username } = req.body;
    if (
      !password ||
      password.length === 0 ||
      !username ||
      username.length === 0
    ) {
      res.status(400).json({
        error: "Invalid body"
      });
      return;
    }
    const token = uid2(16);
    const salt = uid2(16);
    const hash = SHA256(password + salt).toString(encBase64);
    const user = new User({
      username,
      token,
      salt,
      hash
    });
    await user.save();
    res.json({
      username,
      token
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal error",
      error: error.message
    });
  }
});
router.post("/user/login", async (req, res) => {
  try {
    const { password, username } = req.body;
    if (
      !password ||
      password.length === 0 ||
      !username ||
      username.length === 0
    ) {
      res.status(400).json({
        error: "Invalid body"
      });
      return;
    }
    const user = await User.findOne({ username });
    if (!user) {
      res.status(403).json({
        error: "Unvalid username/password"
      });
      return;
    }
    const hash = SHA256(password + user.salt).toString(encBase64);
    if (hash !== user.hash) {
      res.status(403).json({
        error: "Unvalid username/password"
      });
      return;
    }
    res.json({
      username,
      token: user.token
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal error",
      error: error.message
    });
  }
});

router.get("/user", async (req, res) => {
  try {
    const user = await User.find({}, "username");
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
