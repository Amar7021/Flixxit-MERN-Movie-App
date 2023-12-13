const jwt = require("jsonwebtoken")

const verfiyToken = (req, res, next) => {
  const token = req.cookies.access_token
  if (!token)
    return res.status(401).json({ Error: "You are not authenticated" })

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ Error: "Token is not valid" })
    req.user = user
    next()
  })
}

module.exports = { verfiyToken }
