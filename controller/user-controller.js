const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const User = require("../model/user-model");
const Mail = require("./mail");

const newUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(res.status(400).json(errors.array()[0].msg));
  }

  const { name, email, mobile, rating, date } = req.body;

  // let existingUser;
  // try {
  //   existingUser = await User.findOne({ email: email });
  // } catch (err) {
  //   return next(res.status(500).json(err));
  // }

  // if (existingUser) {
  //   return next(
  //     res.status(422).json({ message: "you already have given rating" })
  //   );
  // }

  const createdUser = new User({
    name,
    email,
    mobile,
    date,
    rating,
  });

  try {
    await createdUser.save();
    Mail(email, name, mobile, rating, date);
    res.status(201).json({ message: "email sent" });
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
};

exports.newUser = newUser;
