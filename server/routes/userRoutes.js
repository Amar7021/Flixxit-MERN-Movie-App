const express = require("express")
const {
  updateUser,
  deleteUser,
  getUser,
  getLikedMovies,
  addToLikedMovies,
  removeFromLikedMovies,
  clearAllFromLikedMovies,
} = require("../controllers/userController")
const { verfiyToken } = require("../middlewares/verifyUser")
const router = express.Router()

//Update user
router.put("/update/:id", verfiyToken, updateUser)

//Delete user
router.delete("/delete/:id", verfiyToken, deleteUser)

//Get user
router.get("/find/:id", getUser)

//Get liked movie
router.get("/favorite/:email", verfiyToken, getLikedMovies)

//Add to favourites
router.post("/addmovie", verfiyToken, addToLikedMovies)

//Remove from favourites
router.put("/removemovie", verfiyToken, removeFromLikedMovies)

//Clear all from favourites
router.put("/clearallmovie", verfiyToken, clearAllFromLikedMovies)

module.exports = router
