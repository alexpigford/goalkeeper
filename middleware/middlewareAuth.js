const config = require("config");
const jwt = require("jsonwebtoken");

// next moves on to next middleware
function auth(req, res, next) {
  // token is in header of request
  const token = req.header("x-auth-token");

  // check for token
  if (!token)
    return res.status(401).json({ msg: "No token. Authorization denied." });

  // check if token is valid
  try {
    const decoded = jwt.verify(token, config.get("jwtLookAway"));

    // add user
    req.user = decoded;
    next();

    // if token is not valid
  } catch (e) {
    res.status(400).json({ msg: "Invalid token." });
  }
}

module.exports = auth;
