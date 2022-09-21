module.exports = (req, res, next) => {
  const regex = /^[a-zA-Z, àâäéèêëîïôöùûüÿçÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]+$/;
  if (req.method === "PUT" && req.file === undefined) {
    // si la requête est une requête PUT et qu'il n'y a pas de fichier
    const sauce = req.body;
    const { name, manufacturer, description, mainPepper } = sauce; // ES6 destructuring
    checkInput(req, res, next, name, manufacturer, description, mainPepper);
  } else {
    // si la requête est une requête POST ou PUT et qu'il y a un fichier
    const sauce = JSON.parse(req.body.sauce);
    const { name, manufacturer, description, mainPepper } = sauce; // ES6 destructuration
    checkInput(req, res, next, name, manufacturer, description, mainPepper);
  }
  function checkInput(
    req,
    res,
    next,
    name,
    manufacturer,
    description,
    mainPepper
  ) {
    if (
      name.length >= 3 &&
      manufacturer.length >= 3 &&
      description.length >= 3 &&
      mainPepper.length >= 3 &&
      regex.test(name) &&
      regex.test(manufacturer) &&
      regex.test(description) &&
      regex.test(mainPepper)
    ) {
      next();
    } else {
      console.log(
        regex.test(name),
        regex.test(manufacturer),
        regex.test(description),
        regex.test(mainPepper)
      );
      res.status(400).json({
        message:
          "vous devez remplir tous les champs avec au moins 3 caractéres sans utiliser de chiffres ni de symbole spéciale !!!",
      });
    }
  }
};
