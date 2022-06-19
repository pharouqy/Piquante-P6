const Sauce = require("../models/sauce");
const fs = require("fs");

exports.createSauce = (req, res, next) => {
  //Ajouter une sauce
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    //likes: 0,
    //dislikes: 0,
    //usersLiked: [],
    //usersDisliked: [],
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Objet a été enregistré" }))
    .catch((error) => console.log(error));
};

exports.getAllSauces = (req, res, next) => {
  //Toutes les sauces
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => console.log(error));
};

exports.getSauce = (req, res, next) => {
  //Une sauce
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => console.log(error));
};

exports.updateSauce = (req, res, next) => {
  //Mettre à jour une sauce
  console.log("req.file", req.file);
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (req.file == null) {
        //Quand la photo n'est pas changer (uploader)
        Sauce.updateOne(
          { _id: req.params.id },
          { ...sauceObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "objet updated" }))
          .catch((error) => console.log(error));
        console.log("1er");
      } else {
        //Si la photo est uploader => changer la photo et suprimer celle dans le server
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.updateOne(
            { _id: req.params.id },
            { ...sauceObject, _id: req.params.id }
          )
            .then(() => res.status(200).json({ message: "objet updated" }))
            .catch((error) => console.log(error));
        });
        console.log("2eme");
      }
    })
    .catch((error) => console.log(error));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet suprimer" }))
          .catch((error) => console.log(error));
      });
    })
    .catch((error) => console.log(error));
};

exports.likDeslikeSauce = (req, res, next) => {
  let like = req.body.like;
  let userId = req.body.userId;
  let sauceId = req.params.id;
  console.log("like number", like);
  console.log("user id", userId);
  console.log("sauce id", sauceId);
  console.log("Sauce : ", Sauce);
  switch (like) {
    case 1:
      Sauce.updateOne(
        { _id: sauceId },
        { $push: { usersLiked: userId }, $inc: { likes: 1 } }
      )
        .then(() => res.status(200).json({ message: "j'aime" }))
        .catch((error) => console.log(error));
      break;
    case 0:
      Sauce.findOne({ _id: sauceId })
        .then((sauce) => {
          console.log(sauce);
          if (sauce.usersLiked.includes(userId)) {
            Sauce.updateOne(
              { _id: sauceId },
              { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
            )
              .then(() => res.status(200).json({ message: "neutre" }))
              .catch((error) => console.log(error));
          } else if (sauce.usersDisliked.includes(userId)) {
            Sauce.updateOne(
              { _id: sauceId },
              { $pull: { usersDisliked: userId }, $inc: { deslikes: -1 } }
            )
              .then(() => res.status(200).json({ message: "neutre" }))
              .catch((error) => console.log(error));
          }
        })
        .catch((error) => console.log(error));
      break;
    case -1:
      Sauce.updateOne(
        { _id: sauceId },
        { $push: { usersDisliked: userId }, $inc: { deslikes: 1 } }
      )
        .then(() => res.status(200).json({ message: "j'aime pas" }))
        .catch((error) => console.log(error));
      break;
    default:
      console.log(error);
  }
};
