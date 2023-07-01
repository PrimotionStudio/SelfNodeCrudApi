const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    let hash = await bcrypt.hash(req.body.password, 10);
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hash,
    });
    newUser
      .save()
      .then((result) => {
        if (result) {
          res.json({ message: "New User Created Successfully" });
        } else {
          res.json({ message: "Error Creating New User1" });
        }
      })
      .catch((error) => {
        res.json({ message: error.message });
      });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    let username = req.body.username;
    let password = req.body.password;
    const result = await User.findOne({
      $or: [{ email: username }, { phone: username }],
    });
    if (result) {
      let hash = result.password;
      bcrypt.compare(password, hash, (error, success) => {
        let loginkey = jwt.sign({ name: result.name }, "{73kru.2lU;q!", {
          expiresIn: "1h",
        });
        res.json({ message: "Login Successful", loginkey: loginkey });
      });
    } else {
      res.json({ message: "An error occured!" });
    }
  } catch (error) {
    res.json({ message: "An error occured!" });
  }
};

const findall = async (req, res) => {
  try {
    const result = await User.find();
    if (result.length > 0) {
      res.json(result);
    } else {
      res.json({ message: "No users found" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "An error occured!" });
  }
};

const findone = async (req, res) => {
  try {
    let userid = req.params.userid;
    const result = await User.findById(userid);
    if (result != {}) {
      res.json(result);
    } else {
      res.json({ message: "No users found" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "An error occured!" });
  }
};

const update = async (req, res) => {
  try {
    let userid = req.params.userid;
    const user = await User.findById(userid);
    if (!user) {
      res.json({ message: "No user found" });
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    let hash = await bcrypt.hash(req.body.password, 10);
    user.password = hash || user.password;
    try {
      await user.save();
      res.json({ message: "User updated successfully" });
    } catch (error) {
      console.log(error);
      res.json({ message: "An error occured!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "An error occured!" });
  }
};

const deleteUser = async (req, res) => {
  try {
    let userid = req.params.userid;
    const result = await User.findByIdAndDelete(userid);
    if (result != {}) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.json({ message: "No users found" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "An error occured!" });
  }
};

module.exports = { register, login, findall, findone, update, deleteUser };
