const express = require('express')
const Blog = require('../models/blog')
const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response) => {
  await Blog
    .find({})
    .then((blogs) => {
      response.json(blogs)
    })
})

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body;

  if (!title || !url) {
    return response.status(400).json({ error: 'Title or URL is missing' });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes,
  });

  await blog
    .save()
    .then((result) => {
      response.status(201).json(result)
    })
})

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (deletedBlog) {
      response.status(204).end();
    } else {
      response.status(404).json({ error: 'Blog not found' });
    }
  } catch (error) {
    if (error.name === 'CastError') {
      response.status(400).json({ error: 'Invalid ID' });
    } else {
      response.status(500).json({ error: 'Something went wrong' });
    }
  }
});



blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { title, author, url, likes } = request.body;

  if (!title || !url) {
    return response.status(400).json({ error: 'Title or URL is missing' });
  }

  const updatedBlog = {
    title,
    author,
    url,
    likes,
  };

  const result = await Blog
    .findByIdAndUpdate(id, updatedBlog, { new: true });
  
  if (result) {
    response.json(result);
  } else {
    response.status(404).json({ error: 'Blog not found' });
  }
});

module.exports = blogsRouter
