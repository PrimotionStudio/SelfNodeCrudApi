const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const register = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      password: Joi.string().min(6).required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "An error occurred!" });
    }

    const hash = await bcrypt.hash(value.password, 10);
    const newUser = new User({
      name: value.name,
      email: value.email,
      phone: value.phone,
      password: hash,
    });

    newUser
      .save()
      .then((result) => {
        if (result) {
          res.status(201).json({ message: "New User Created Successfully" });
        } else {
          res.status(204).json({ message: "Error Creating New User" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: error.message });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "An error occurred!" });
    }

    const { username, password } = value;
    const result = await User.findOne({
      $or: [{ email: username }, { phone: username }],
    });
    if (result) {
      const hash = result.password;
      bcrypt.compare(password, hash, (error, success) => {
        if (success) {
          const loginkey = jwt.sign({ name: result.name }, "{73kru.2lU;q!", {
            expiresIn: "1h",
          });
          res
            .status(202)
            .json({ message: "Login Successful", loginkey: loginkey });
        } else {
          res.status(204).json({ message: "Invalid credentials" });
        }
      });
    } else {
      res.status(204).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred!" });
  }
};

const findall = async (req, res) => {
  try {
    const result = await User.find();
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No users found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred!" });
  }
};

const findone = async (req, res) => {
  try {
    const schema = Joi.object({
      userid: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.params);
    if (error) {
      return res.status(400).json({ message: "An error occurred!" });
    }

    const { userid } = value;
    const result = await User.findById(userid);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No user found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred!" });
  }
};

const update = async (req, res) => {
  try {
    const schema = Joi.object({
      userid: Joi.string().required(),
      name: Joi.string(),
      email: Joi.string().email(),
      phone: Joi.string(),
      password: Joi.string().min(6),
    });

    const { error: paramError, value: paramValue } = schema.validate(
      req.params
    );
    if (paramError) {
      return res.status(400).json({ message: "An error occurred!" });
    }

    const { userid, ...updateData } = paramValue;

    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    const { error: bodyError, value: bodyValue } = schema.validate(req.body);
    if (bodyError) {
      return res.status(400).json({ message: "An error occurred!" });
    }

    Object.assign(user, bodyValue);

    if (bodyValue.password) {
      user.password = await bcrypt.hash(bodyValue.password, 10);
    }

    try {
      await user.save();
      res.status(201).json({ message: "User updated successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "An error occurred!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred!" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const schema = Joi.object({
      userid: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.params);
    if (error) {
      return res.status(400).json({ message: "An error occurred!" });
    }

    const { userid } = value;
    const result = await User.findByIdAndDelete(userid);
    if (result) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "No user found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred!" });
  }
};

module.exports = { register, login, findall, findone, update, deleteUser };
