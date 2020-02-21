const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");

// USER MODEL
const User = require("../../models/User");

// REGISTER
router.post("/", (req, res) => {
  const { email, username, password } = req.body;
  // validation
  if (!email || !username || !password) {
    return res.status(400).json({ msg: "All fields are required." });
  }
  // check for existing username
  User.findOne({ username }).then(user => {
    if (user) return res.status(400).json({ msg: "Username already exists" });
  });
  // check for existing email address
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    // if unique values create a new user
    const newUser = new User({
      email,
      username,
      password
    });
    // create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            // JWT is sent with user id
            { id: user.id },
            // get JWT secret from config file
            config.get("jwtLookAway"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              // upon registration, send user with token
              res.json({
                token,
                user: {
                  id: user.id,
                  email: user.email,
                  username: user.username
                }
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
