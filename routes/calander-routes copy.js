const express = require("express");

const router = express.Router();

const calanderController = require("../controllers/calander");

//Journal Routes
router.post("/newEntry", calanderController.createCalanderEntry); // Creating a new calander entry

module.exports = router;
