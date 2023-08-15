import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, username }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,

  }

  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addlikes = () => {
    const addlike = {
      ...blog,
      likes: blog.likes + 1,

    }

    updateBlog(blog.id, addlike)
  }

  const deleteblog = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        <span className="title"> {blog.title} </span>
        <span className="author"> {blog.author}</span>
        <button id='viewbutton' onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button id="likebutton" onClick={addlikes}>like</button></div>
        <div>{blog.user.name}</div>
        {blog.user.username === username && (
          <button id="removebutton" onClick={deleteblog}>remove</button>
        )}


      </div>

    </div>

  )
}

export default Blog