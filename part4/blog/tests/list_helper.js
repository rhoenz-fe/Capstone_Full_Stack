const { curryRight } = require("lodash")

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.reduce((sum, blog) => sum + blog.likes, 0)
    return likes
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null
    const mostLiked = blogs.reduce((prev, curr) => {
      return prev.likes > curr.likes ? prev : curr
    })
    return {
      title: mostLiked.title,
      author: mostLiked.author,
      likes: mostLiked.likes,
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null
    const authorToBlogs = {}
    blogs.forEach((blog) => {
      if (blog.author in authorToBlogs) {
        authorToBlogs[blog.author]++
      } else {
        authorToBlogs[blog.author] = 1
      }
    })
    const authorWithMostBlogs = Object.keys(authorToBlogs).reduce((prev, curr) => {
      return authorToBlogs[curr] > authorToBlogs[prev] ? curr : prev
    })
    return {
      author: authorWithMostBlogs,
      blogs: authorToBlogs[authorWithMostBlogs],
    }
  }

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null
    const authorToLikes = {}
    blogs.forEach((blog) => {
      if (blog.author in authorToLikes) {
        authorToLikes[blog.author] += blog.likes
      } else {
        authorToLikes[blog.author] = blog.likes
      }
    })
    const authorWithMostLikes = Object.keys(authorToLikes).reduce((prev, curr) => {
      return authorToLikes[curr] > authorToLikes[prev] ? curr : prev
    })
  
    return {
      author: authorWithMostLikes,
      likes: authorToLikes[authorWithMostLikes],
    }
  }

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}