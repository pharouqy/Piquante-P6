//const bcrypt = require("bcrypt");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js"); // Crypter l'email dans la base de données

const User = require("../models/user");

exports.singup = (req, res, next) => {
  argon2
    .hash(req.body.password, { hashLength: 150 })
    .then((hash) => {
      const user = new User({
        email: CryptoJS.EvpKDF(
          req.body.email,
          process.env.SECRET_TOKEN
        ).toString(CryptoJS.enc.Base64),
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "User Created !!!" }))
        .catch((error) => {
          console.log(error.statusCode);
        });
    })
    .catch((error) => {
      console.log(error.statusCode);
    });
};

/*exports.login = (req, res, next) => {
  const emailCrypt = CryptoJS.EvpKDF(
    req.body.email,
    process.env.SECRET_TOKEN
  ).toString(CryptoJS.enc.Base64);
  console.log(emailCrypt);
  User.findOne({ email: emailCrypt })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Utilisateur non trouvé ou Mot de passe incorrect!!!",
        });
      }
      argon2
        .verify(user.password, req.body.password)
        .then((valid) => {
          if (!valid) {
            return res.status(500).json({
              message: "Utilisateur non trouver ou Mot de passe incorrect!!!",
            });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => {
          console.log(error.statusCode);
        });
    })
    .catch((error) => {
      console.log(error.statusCode);
    });
};*/

// refactoriser en async / await
exports.login = async (req, res, next) => {
  const emailCrypt = CryptoJS.EvpKDF(
    req.body.email,
    process.env.SECRET_TOKEN
  ).toString(CryptoJS.enc.Base64);
  console.log(emailCrypt);
  try {
    const user = await User.findOne({ email: emailCrypt });
    if (!user) {
      return res.status(401).json({
        message: "Utilisateur non trouvé ou Mot de passe incorrect!!!",
      });
    } else {
      res.status(200).json({
        userId: user._id,
        token: jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {
          expiresIn: "24h",
        }),
      });
    }
  } catch {
    throw new Error(errorMessage);
  }
};
