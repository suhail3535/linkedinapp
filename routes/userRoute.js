const express = require("express");
const { userModel } = require("../model/user.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


///user Register
userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password, age, city, is_married } = req.body;
  try {
    bcrypt.hash(password, 3, async (err, hash) => {
      const user = new userModel({
        email,
        password: hash,
        gender,
        name,
        age,
        city,
        is_married,
      });
      await user.save();
      res.status(200).send({ msg: "user added" });
    });
  } catch (error) {
    res.status(400).send({ msg: "error creating user" });
  }
});


///user login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(200).send({
            msg: "login success",
            token: jwt.sign({ UserID: user._id }, "masai"),
          });
        } else {
          res.status(400).send({ msg: "error wrong data" });
        }
      });
    } else {
      res.status(400).send({ msg: "error wrong data" });
    }
  } catch (error) {
    res.status(400).send({ msg: "error wrond data" });
  }
});

module.exports = {
  userRouter,
};
