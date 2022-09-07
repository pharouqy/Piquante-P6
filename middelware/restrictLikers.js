const jwt = require("jsonwebtoken");
const Sauce = require("../models/sauce");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedtoken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedtoken.userId;
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        if (
          (sauce.usersLiked.every((user) => user !== userId) && // si tous les usersLiked & usersDesliked ne contiennent pas l'userId
            sauce.usersDisliked.every((user) => user !== userId)) ||
          req.body.like === 0 // ou si le like est neutre
        ) {
          next();
        } else if (
          sauce.usersLiked.includes(userId) || // si l'userId est dans usersLiked
          sauce.usersDisliked.includes(userId) // si l'userId est dans usersDisliked
        ) {
          res.status(403).json({ message: "You can't like or deslike twice" });
        }
      })
      .catch((error) => console.log(error));
  } catch {
    return (error) => {
      console.log(error);
    };
  }
};
