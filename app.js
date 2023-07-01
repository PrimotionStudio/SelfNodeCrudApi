const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();
const userRoutes = require("./routes/user");

// Middlewares (between requests and responses)
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", userRoutes);

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
