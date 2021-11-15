const express = require("express");

const router = express.Router();

const weatherController = require("../controllers/weather");

//Weather Routes
router.post("/currentWeather", weatherController.getWeather);

module.exports = router;
