const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const loginkey = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(loginkey, "{73kru.2lU;q!");
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Authentication Failed" });
  }
};

module.exports = auth;
