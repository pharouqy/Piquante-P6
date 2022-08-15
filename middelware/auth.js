const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedtoken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedtoken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      //throw "invalid user ID";
      res.status(403).json({ message: "invalid user ID" });
    } else {
      next();
    }
  } catch {
    return (error) => {
      console.log(error);
    };
  }
};
