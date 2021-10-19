const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const configData = require("./config/environment/development.json");
const weatherAPIKey = configData.weatherAPI;

// const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");

const PORT = 4000;
const app = express();

//// Server Configuration
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: configData.session.secret,
    resave: configData.session.resave,
    saveUninitialized: configData.session.saveUninitialized,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//// Database connection
mongoose.connect(configData.mongoose.connectionString, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const journalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  roomType: {
    type: String,
    required: [true, "roomType is required"],
  },
  waterType: {
    type: String,
    required: [true, "waterType is required"],
  },
  vegWatt: {
    type: String,
    required: [true, "veg Wattage is required"],
  },
  vegLight: {
    type: String,
    required: [true, "vegLight is required"],
  },
  flowerWatt: {
    type: String,
    required: [true, "Flower Wattage is required"],
  },
  flowLight: {
    type: String,
    required: [true, "flowLight is required"],
  },
  growMedium: {
    type: Array,
    required: [true, "Grow Medium is required"],
  },
  activeJournal: {
    type: Boolean,
    required: [true, "Journal Active is required"],
  },
  journalUsername: {
    type: String,
    required: [true, "Journal Username is required"],
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});

userSchema.plugin(passportLocalMongoose);

const Journal = mongoose.model("Journal", journalSchema);
const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//// Cors settings
app.use((req, res, next) => {
  //Replace "http://localhost:3000" with '*' wildcard to allow access from all locations
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//// Creating a new journal
app.post("/createJournal", function (req, res, next) {
  console.log(req.body);
  const newJournal = new Journal({
    name: req.body.journalNameField,
    description: req.body.journalDescField,
    roomType: req.body.journalRoomType,
    waterType: req.body.journalWaterType,
    vegLight: req.body.journalVegLight,
    flowLight: req.body.journalFlowLight,
    vegWatt: req.body.journalVegWatt,
    flowerWatt: req.body.journalFlowerWatt,
    growMedium: req.body.journalGrowMedium,
    activeJournal: true,
    journalUsername: req.body.journalUsername,
  });

  console.log("New Journal");
  console.log(newJournal);

  newJournal.save((err) => {
    if (!err) {
      res.status(201).json({ message: "Success" });
      // res.statusCode = 200;
      // res.send({ journalCreate: "Success" });
    } else {
      res.status(401).json({ journalCreate: "Failure" });
      // res.send("Problems Problems Problems");
      console.log(err);
    }
  });
});
//// Getting data of all journals
app.post("/journalGet", function (req, res, next) {
  Journal.find(function (err, journals) {
    if (err) {
      console.log(err);
    } else {
      res.send(journals);
    }
  });
});

// Creating a new User
app.post("/createUser", function (req, res, next) {
  // Using passport to register users on the database
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    function (err, user) {
      if (err) {
        res.send("Problems Problems Problems");
        console.log(err);
        console.log("----------------------------------------");
      }
      passport.authenticate("local")(req, res, function () {
        console.log(" authenticate Sign Up");
        console.log("----------------------------------------");
        res.header("set-cookie", "register=true");
        res.send("API is working properly");
      });
    }
  );
});

app.get("/secrets", function (req, res) {
  if (req.isAuthenticated()) {
    res.header("set-cookie", "register=true");
    res.send("API is working properly");
  } else {
    res.send("Problems Problems Problems");
  }
});

app.get("/currentWeather", function (req, res) {
  console.log("currentWeather API Call");
  var apiCall =
    "https://api.openweathermap.org/data/2.5/weather?q=Kempton Park&units=metrics&appid=" +
    weatherAPIKey;
  https.get(apiCall, (resp) => {
    let data = "";
    console.log(resp);
  });
});

//Logging user in
app.post("/loginUser", function (req, res, next) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        //Generating token
        const token = jwt.sign(
          { email: req.body.username },
          "SuperSecretKeySuperSecretKey",
          { expiresIn: "1h" }
        );
        console.log(" authenticate Sign In");
        console.log("----------------------------------------");
        res.status(200).json({ token: token, userId: user.username });
        // res.send({ token: token, userId: user.username });
      });
    }
  });
});

// res.send({ token: token });
// save user token
// user.token = token;

// return new user
// console.log(user);

// res.header("set-cookie", "register=true");
// res.send("API is working properly");

app.get("/logout", function (req, res) {
  req.logOut();
  console.log(" authenticate Sign Out");
  console.log("----------------------------------------");
});

app.get("/", function (req, res, next) {
  res.send("API is working properly");
});

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
