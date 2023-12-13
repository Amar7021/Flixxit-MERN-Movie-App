const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const userRoutes = require("./routes/userRoutes")
const authRoutes = require("./routes/authRoutes")

dotenv.config()

//Express App
const app = express()

//Middleware
const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["set-cookie"],
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())

//Connect to DataBase
const DB_URI = process.env.MONGO_URI
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log(`Connected to MongoDB`)
  })
  .catch((error) => {
    console.log(error)
  })

//Routes
app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)

//Listen to server
const Port = process.env.PORT || 8080

app.listen(Port, () =>
  console.log(`Flixxit server is running on http://localhost:${Port}`)
)
