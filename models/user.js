const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator"); // Avoir un seul utilisateur avec un meme email
const MongooseErrors = require("mongoose-errors");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator, MongooseErrors);

module.exports = mongoose.model("User", userSchema);
