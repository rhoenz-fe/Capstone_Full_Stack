const config = require("./util/config")
const express = require("express")
require("express-async-errors")
const app = express()
const cors = require("cors")
const logger = require("./util/logger")
const middleware = require("./util/middleware")
const mongoose = require("mongoose")
const blogsRouter = require("./controller/blog")
const usersRouter = require("./controller/user")
const loginRouter = require("./controller/login")

const url = config.MONGODB_URI
logger.info("connecting to MongoDB")

mongoose
  .connect(url)
  .then(() => {
    logger.info("connected to MongoDB")
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use("/api/blogs", middleware.userExtractor, blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app