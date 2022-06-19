module.exports = (req, res, next) => {
  const sauce = req.body;
  console.log(sauce);
  const { name, manufacturer, description, mainPepper } = sauce; // ES6 destructuring
  if (
    name.length >= 3 &&
    manufacturer.length >= 3 &&
    description.length >= 3 &&
    mainPepper.length >= 3
  ) {
    next();
  } else {
    res.status(400).json({
      message:
        "Vous devez remplir tous les champs avec au moins 3 caractéres !!!",
    });
  }
};
