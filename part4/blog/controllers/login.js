const config = require("../utils/config")
const loginRouter = require("express").Router()
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })

  const passCheck = user !== null && await bcrypt.compare(password, user.passwordHash);


  if (!(user && passCheck)) {
    return response.status(401).json({
      error: "invalid username or password",
    })
  }

  const userToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userToken, config.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter