const express = require("express")
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController")
const router = express.Router()

//Create user route
router.post("/register", registerUser)

//Login user route
router.post("/login", loginUser)

//Logout user route
router.post("/logout", logoutUser)

module.exports = router
