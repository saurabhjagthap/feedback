const express = require("express");
const userController = require("../controller/user-controller");
const { check } = require("express-validator");

const Router = express.Router();

Router.post(
  "/feedback",
  [
    check("name", "Please enter name").not().isEmpty(),
    check("email", "please enter email").not().isEmpty(),
    check("rating", "rating ie required,").not().isEmpty(),
    check("mobile", "mobile no is required,it must be 10 digit")
      .not()
      .isEmpty()
      .isLength({ min: 10 }, { max: 10 }),
    check("date", "enter date").not().isEmpty(),
  ],
  userController.newUser
);

module.exports = Router;
