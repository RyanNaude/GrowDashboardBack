const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const jwt = require("jsonwebtoken");

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
    secret: "Our little secret sentence.",
    resave: false,
    saveUninitialized: false,
  })
);

// app.use(passport.initialize());
// app.use(passport.session());

//// Database connection
mongoose.connect(
  "mongodb+srv://Ryan_Naude:ArwypTest@cluster0.v3lqg.mongodb.net/grow?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true }
);

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
  vegLight: {
    type: String,
    required: [true, "vegLight is required"],
  },
  flowLight: {
    type: String,
    required: [true, "flowLight is required"],
  },
  growMedium: {
    type: String,
    required: [true, "Grow Medium is required"],
  },
});

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: [true, "ID is required"],
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  email: {
    type: String,
    required: [true, "Email address is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

// userSchema.plugin(passportLocalMongoose);

const Journal = mongoose.model("Journal", journalSchema);
const User = mongoose.model("User", userSchema);

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

//// Cors settings
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//// Handle requests

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
    growMedium: req.body.journalGrowMedium,
  });

  newJournal.save((err) => {
    if (!err) {
      res.send("API is working properly");
    } else {
      res.send("Problems Problems Problems");
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
//// Creating a new User
app.post("/createUser", function (req, res, next) {
  // console.log(req.body);
  const newUser = new User({
    _id: req.body.userEmailField,
    firstName: req.body.userFirstNameField,
    lastName: req.body.userLastNameField,
    email: req.body.userEmailField,
    password: req.body.userPasswordField,
  });
  newUser.save((err) => {
    if (!err) {
      res.header("set-cookie", "register=true");
      res.send("API is working properly");
    } else {
      res.send("Problems Problems Problems");
      console.log(err);
    }
  });
});

//Logging user in
app.post("/loginUser", function (req, res, next) {
  User.findById(req.body.userEmailField, function (err, users) {
    if (err) {
      console.log(err);
    } else {
      if (users.password === req.body.userPasswordField) {
        //Generating token
        const token = jwt.sign(
          { email: req.body.userEmailField },
          "SuperSecretKeySuperSecretKey",
          { expiresIn: "1h" }
        );
        res.send({ users: users, token: token });
      } else {
        res.send("None");
      }
    }
  });
});

app.get("/", function (req, res, next) {
  res.send("API is working properly");
});

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
