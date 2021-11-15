const express = require("express");

const router = express.Router();

const journalController = require("../controllers/journal");
const userController = require("../controllers/user");
const weatherController = require("../controllers/weather");

//Journal Routes
router.post("/createJournal", journalController.createJournal); // Creating a new journal
router.post("/journalGet", journalController.getJournals); // Getting data of all journals

//User Routes
// router.post("/createUser", userController.createUser); // Creating a new User
// router.post("/loginUser", userController.loginUser); //Logging user in
// router.get("/logout", userController.logout);

//Weather Routes
// router.post("/currentWeather", weatherController.getWeather);

module.exports = router;
