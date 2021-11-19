const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const jwt = require("jsonwebtoken");

const configData = require("./config/environment/development.json");
const weatherAPIKey = configData.weatherAPI;

const https = require("https");

// Import App Routes
// const routes = require("./routes/routes");
const userRoutes = require("./routes/user-routes");
const weatherRoutes = require("./routes/weather-routes");
const journalRoutes = require("./routes/journal-routes");

//Import Models
const userModel = require("./models/user");

const PORT = 4000;

//// Server Configuration
const app = express();
app.use(bodyParser.json());
const secretKey = configData.sessionSecret;
app.use(
  session({ secret: secretKey, resave: false, saveUninitialized: false })
);

// Cors settings
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Authorization, Accept"
  );
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//Import Routes

app.use("/user", userRoutes);
app.use("/weather", weatherRoutes);
app.use("/journal", journalRoutes);

//// Database connection
mongoose.connect(configData.mongoose.connectionString).then((result) => {
  app.listen(PORT);
  console.log("Server is running on Port: " + PORT);
});
