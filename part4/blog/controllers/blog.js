const jwt = require('jsonwebtoken')
const config = require("../utils/config")
const express = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')
const blogsRouter = express.Router()


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate("user", { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const token = request.token
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!decodedToken.id) {
    return response
      .status(401)
      .json({ error: 'Token missing or invalid' })
  }

  const user = request.user
  const blog = await new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  }).populate("user", { username: 1, name: 1 })

  const save = await blog.save()

  user.blogs = user.blogs.concat(save._id)
  await user.save()

  response
    .status(201)
    .json(save.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  const token = request.token
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!decodedToken.id) {
    return response
      .status(401)
      .json({ error: 'Token missing or invalid' })
  }


  const blog = await Blog.findById(id)
  const user = request.user

  if (!blog) {
    return response
      .status(404)
      .json({ error: 'Blog not found' })
  }

  if (blog.user.toString() === user.id.toString()) {
    await Blog.deleteOne({ _id: id });
    response.sendStatus(204).end();
  } else {
    response.status(401).json({ error: "unauthorized operation" });
  }

})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body

  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const result = await Blog
    .findByIdAndUpdate(id, updatedBlog, { new: true })

  if (result) {
    response.json(result)
  } else {
    response
      .status(404)
      .end()
  }
})

module.exports = blogsRouter
