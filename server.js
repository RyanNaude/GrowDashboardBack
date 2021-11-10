const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const configData = require("./config/environment/development.json");
const weatherAPIKey = configData.weatherAPI;

const https = require("https");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

// Import App Routes
const routes = require("./routes/routes");

const PORT = 4000;

//// Server Configuration
const app = express();
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

const journalModel = require("./models/journal");
const userModel = require("./models/user");

// userModel.Users.plugin(passportLocalMongoose);

// const Journal = mongoose.model("Journal", journalModel.Journal);
// const User = mongoose.model("User", userModel.Users);

// passport.use(User.createStrategy());

// passport.serializeUser(userModel.serializeUser());
// passport.deserializeUser(userModel.deserializeUser());

//// Cors settings
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Authorization, Accept"
  );
  next();
});

//Import Routes
app.use(routes);

// app.use("/loginUser", function (req, res ) {
//   console.log("API is working properly");
// });

//// Database connection
mongoose.connect(configData.mongoose.connectionString).then((result) => {
  app.listen(PORT);
  console.log("Server is running on Port: " + PORT);
});
