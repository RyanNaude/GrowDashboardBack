const express = require("express");

const router = express.Router();

const costmanagementController = require("../controllers/costManagement");

//Cost Management Routes
router.post("/addDevice", costmanagementController.addDevice); // create new device

module.exports = router;
