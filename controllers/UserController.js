const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    let userdetails = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hash,
    });
    userdetails
      .save()
      .then((result) => {
        if (result) {
          res
            .status(200)
            .json({ message: `${req.body.name} created successfully` });
        } else {
          res.status(500).json({
            message: `An error occured while creating ${req.body.name}`,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: `An error occured! ${error.message}`,
        });
      });
  });
};

module.exports = {
  register,
};
