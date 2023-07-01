const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const authmw = require("../middlewares/authmw");

router.post("/register", UserController.register);
router.post("/login", UserController.login);

// Auth Required
router.get("/users", authmw, UserController.findall);
router.get("/users/:userid", authmw, UserController.findone);
router.put("/users/:userid", authmw, UserController.update);
router.delete("/users/:userid", authmw, UserController.deleteUser);
module.exports = router;
