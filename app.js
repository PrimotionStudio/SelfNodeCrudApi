const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/userModel");
const app = express();

// Middlewares (between requests and responses)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// A demo route
app.get("/", (req, res) => {
  res.status(200).send("Welcome To My Node CRUD API Built By My Self");
});

// routes

// Create/Insert/Add User
app.post("/users/add", async (req, res) => {
  try {
    console.log(req.body);
    if (await User.create(req.body)) {
      console.log(`New User ${req.body.name} created successfully`);
      res
        .status(201)
        .json({ message: `New User ${req.body.name} created successfully` });
    } else {
      console.log(`Could Not Add User ${req.body.name}`);
      res.status(500).json({ message: `Could Not Add User ${req.body.name}` });
    }
  } catch (error) {
    console.log("Could not add user");
    console.log("User Details: ", req.body);
    console.log("Error Details: ", error);
    res.status(500).json({ message: error.message });
  }
});

// Read/Select/Find User
app.get("/users", async (req, res) => {
  try {
    const allUsers = await User.find({});
    if (allUsers) {
      res.status(200).json(allUsers);
    } else {
      res.status(204).json({ message: "No Users" });
    }
  } catch (error) {
    console.log("Could not find users");
    console.log("User Details: ", req.params);
    console.log("Error Details: ", error);
    res.status(500).json({ message: error.message });
  }
});
app.get("/users/:userid", async (req, res) => {
  try {
    const user = await User.findById(req.params.userid);
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(204)
        .json({ message: `No User Found By Id: ${req.params.userid}` });
    }
  } catch (error) {
    console.log("Could not find user");
    console.log("User Details: ", req.params);
    console.log("Error Details: ", error);
    res.status(500).json({ message: error.message });
  }
});
app.post("/users/", async (req, res) => {
  if (req.body.userid) {
    try {
      const user = await User.findById(req.body.userid);
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(204)
          .json({ message: `No User Found By Id: ${req.body.userid}` });
      }
    } catch (error) {
      console.log("Could not find user");
      console.log("User Details: ", req.body);
      console.log("Error Details: ", error);
      res.status(500).json({ message: error.message });
    }
  } else {
    try {
      const allUsers = await User.find({});
      if (allUsers) {
        res.status(200).json(allUsers);
      } else {
        res.status(204).json({ message: "No Users" });
      }
    } catch (error) {
      console.log("Could not find users");
      console.log("User Details: ", req.body);
      console.log("Error Details: ", error);
      res.status(500).json({ message: error.message });
    }
  }
});

// Put/Update User
app.put("/users/:userid", async (req, res) => {
  try {
    const oldUser = await User.findByIdAndUpdate(req.params.userid, req.body);
    if (oldUser) {
      const updatedUser = await User.findById(req.params.userid);
      res.status(200).json({ oldUser: oldUser, updatedUser: updatedUser });
    } else {
      res.status(204).json({ message: "No Users" });
    }
  } catch (error) {
    console.log("Could not find users");
    console.log("User Details: ", req.params, req.body);
    console.log("Error Details: ", error);
    res.status(500).json({ message: error.message });
  }
});

// Delete User
app.delete("/users/:userid", async (req, res) => {
  try {
    const oldUser = await User.findByIdAndDelete(req.params.userid);
    console.log(oldUser);
    if (oldUser) {
      const updatedUser = await User.findById(req.params.userid);
      res.status(200).json({ oldUser: oldUser, updatedUser: updatedUser });
    } else {
      res.status(204).json({ message: "No Users" });
    }
  } catch (error) {
    console.log("Could not find users");
    console.log("User Details: ", req.params, req.body);
    console.log("Error Details: ", error);
    res.status(500).json({ message: error.message });
  }
});

// Connect Database and Run Server
try {
  mongoose.connect("mongodb://127.0.0.1:27017/selfnodecrudapi").then(() => {
    console.log("Database Connection Establised: 127.0.0.1:27017");
    try {
      app.listen(5000, () => {
        console.log("App/Server running on port: 5000");
      });
    } catch (error) {
      console.log("Failed to run server");
      console.log("Error: ", error.message);
    }
  });
} catch (error) {
  console.log("Failed to esablish connection");
  console.log("Error: ", error.message);
}
