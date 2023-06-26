const jwt = require('jsonwebtoken')
const config = require("../util/config")
const express = require('express')
const Blog = require('../model/blog')
const blogsRouter = express.Router()


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate("user", { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body

  if (!title || !url) {
    return response
      .status(400)
      .json({ error: 'missing title or url' })
  }

  const token = request.token
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!decodedToken.id) {
    return response
      .status(401)
      .json({ error: 'Token missing or invalid' })
  }

  const user = request.user
  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id,
  })

  await blog.save()

  user.blogs = user.blogs.concat(blog._id)
  await user.save()

  response
    .status(201)
    .json(blog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params

  const token = request.token
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!decodedToken.id) {
    return response
      .status(401)
      .json({ error: 'Token missing or invalid' })
  }

  try {
    const blog = await Blog.findById(id)

    if (!blog) {
      return response
        .status(404)
        .json({ error: 'Blog not found' })
    }

    const user = request.user

    if (blog.user.toString() !== user._id.toString()) {
      return response
        .status(401)
        .json({ error: 'Unauthorized to delete' })
    }

    await Blog
      .findByIdAndDelete(id)
    response
      .status(204)
      .end()
  } catch (error) {
    next(error)
  }
})



blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params
  const { title, author, url, likes } = request.body

  if (!title || !url) {
    return response
      .status(400)
      .json({ error: 'Title or URL is missing' })
  }

  const updatedBlog = {
    title,
    author,
    url,
    likes,
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
