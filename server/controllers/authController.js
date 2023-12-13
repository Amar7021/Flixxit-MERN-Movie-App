const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//Create a user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body
  try {
    //Validators
    if (!username || !email || !password)
      return res.status(400).json({ Error: "Missing fields!" })

    //Check for existing users with the same email
    const existingEmail = await User.findOne({ email })
    if (existingEmail)
      return res.status(409).json({ Error: "Email already exists!" })

    //Check for existing users with the same username
    const existingUsername = await User.findOne({ username })
    if (existingUsername)
      return res.status(409).json({ Error: "Username already in use!" })

    //Hashing the password
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    //Create a new user
    const newUser = new User({ username, email, password: hashedPassword })
    await newUser.save()

    res.status(201).json({ Message: "User created successfully!" })
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

//Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    // Validators
    if (!email || !password) {
      return res.status(400).json({ Error: "Missing fields!" })
    }

    // Check for existing users with the same email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ Error: "Invalid email address!" })
    }

    const comparePassword = await bcrypt.compare(password, user.password)
    if (!comparePassword) {
      return res.status(401).json({ Error: "Incorrect Password!" })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    })

    const { password: userPassword, ...others } = user._doc

    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 86400000,
        sameSite: "None",
        secure: true,
      })
      .status(200)
      .json({ ...others })
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("access_token", {
      sameSite: "None",
      secure: true,
    })

    res.status(200).json({ Message: "Logout successful!" })
  } catch (error) {
    return res.status(500).json({ Error: "Internal server error!" })
  }
}

module.exports = { registerUser, loginUser, logoutUser }
