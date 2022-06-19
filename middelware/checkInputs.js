module.exports = (req, res, next) => {
  if (req.body === true) {
    const sauce = req.body;
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
  } else {
    const sauce = JSON.parse(req.body.sauce);
    const { name, manufacturer, description, mainPepper } = sauce; // ES6 destructuration
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
          "vous devez remplir tous les champs avec au moins 3caractéres !!!",
      });
    }
  }
};
