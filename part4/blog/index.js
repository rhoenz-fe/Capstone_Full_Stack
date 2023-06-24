const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blog')

const mongoUrl = 'mongodb+srv://rhofer:ognary@cluster0.63muped.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})