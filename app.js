const express = require("express");
const mongoose = require("mongoose");
//const bodyParser = require('body-parser');
const helmet = require("helmet");
require("dotenv").config();
const path = require("path");
const rateLimit = require("express-rate-limit"); // Limite le nombre de requêtes et éviter les attaques (Brute Force & DDOS)
const cors = require("cors");

const sauceRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

mongoose
  .connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-shard-00-00.d4buf.mongodb.net:27017,cluster0-shard-00-01.d4buf.mongodb.net:27017,cluster0-shard-00-02.d4buf.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-8i7j0t-shard-0&authSource=admin&retryWrites=true&w=majority`,
    //{ useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => {
    console.log(error);
  });

const app = express();

app.use(helmet()); // protection des headers

// Apply the rate limiting middleware to all requests
app.use(limiter);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(cors()); // autorisation des requetes cross-origin

app.use(express.json()); // pour parser les requêtes en JSON

app.use("/images", express.static(path.join(__dirname, "images"))); //pour pouvoir accéder aux images depuis le front

app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
