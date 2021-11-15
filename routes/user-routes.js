const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");

//User Routes
router.post("/createUser", userController.createUser); // Creating a new User
router.post("/loginUser", userController.loginUser); //Logging user in
router.get("/logout", userController.logout);

module.exports = router;
