const express = require("express");

const router = express.Router();

const journalController = require("../controllers/journal");

//Journal Routes
router.post("/createJournal", journalController.createJournal); // Creating a new journal
router.post("/updateJournal", journalController.updateJournal); // Creating a new journal
router.post("/journalGet", journalController.getJournals); // Getting data of all journals

module.exports = router;
