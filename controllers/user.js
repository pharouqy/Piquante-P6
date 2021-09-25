const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const User = require("../models/user");

exports.singup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "User Created !!!" }))
        .catch((error) =>
          res.status(400).json({ message: "utilisateur non crée" })
        );
    })
    .catch((error) => res.status(500).json({ message: "error 3" }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouver !!!" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(500).json({ message: "Most de passe incorrect" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                { userId: user._id },
                process.env.SECRET_TOKEN,
                {expiresIn: "24h"}
                )
          });
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};
