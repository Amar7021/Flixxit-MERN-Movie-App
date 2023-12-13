const User = require("../models/userModel")

//Update user
const updateUser = async (req, res) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      )
      res.status(200).json(updatedUser)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  } else {
    return res.status(403).json({ Error: "You can update only your account!" })
  }
}

//Delete a user
const deleteUser = async (req, res) => {
  if (req.params.id === req.user.id) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id)
      res.status(200).json(deletedUser)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  } else {
    return res.status(403).json({ Error: "You can delete only your account!" })
  }
}

//Get a user
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({ Error: "User not found" })
    }
    res.status(200).json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ Error: "Internal Server Error" })
  }
}

const getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params
    const user = await User.findOne({ email })
    if (user) {
      return res.json({ msg: "success", movies: user.likedMovies })
    } else return res.json({ Error: "User with given email not found." })
  } catch (error) {
    return res.json({ Error: "Error fetching movies." })
  }
}

// Add movie to favorites
const addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body
    const user = await User.findOne({ email })
    if (user) {
      const { likedMovies } = user
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id)
      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        )
      } else return res.json({ Error: "Movie already exists in My List." })
    } else await User.create({ email, likedMovies: [data] })
    return res.json({ msg: "Movie added to My List." })
  } catch (error) {
    return res.json({ Error: "Error adding movie to My List" })
  }
}

// Remove movie from favorites
const removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body
    const user = await User.findOne({ email })
    if (user) {
      const movies = user.likedMovies
      const movieIndex = movies.findIndex(({ id }) => id === movieId)

      if (movieIndex === -1) {
        return res.status(400).send({ msg: "Movie not found." })
      }
      movies.splice(movieIndex, 1)
      await User.findByIdAndUpdate(
        user._id,
        {
          likedMovies: movies,
        },
        { new: true }
      )
      return res.json({ msg: "Movie removed from My List", movies })
    } else return res.json({ msg: "User with given email not found." })
  } catch (error) {
    return res.json({ msg: "Error removing movie from My list" })
  }
}

//Clear All from Movies
const clearAllFromLikedMovies = async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })

    if (user) {
      user.likedMovies = []
      await user.save()

      return res.json({ msg: "All movies cleared successfully.", movies: [] })
    } else {
      return res.status(404).json({ msg: "User with given email not found." })
    }
  } catch (error) {
    return res.status(500).json({ msg: "Error clearing movies", error })
  }
}

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  getLikedMovies,
  addToLikedMovies,
  removeFromLikedMovies,
  clearAllFromLikedMovies,
}
