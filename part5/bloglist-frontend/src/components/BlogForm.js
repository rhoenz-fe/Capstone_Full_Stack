import { useState } from 'react'

const BlogForm = ({ handleCreate }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const createBlog = (event) => {
    event.preventDefault()
    handleCreate(newBlog.title, newBlog.author, newBlog.url)
    setNewBlog({ title: '', author: '', url: '' })
  }

  const handleInput = (event) => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  return (
    <div>
      <h2>Create new Blog</h2>
      <form onSubmit={createBlog}>
        <div>
          title
          <input
            name="title"
            type="text"
            value={newBlog.title}
            onChange={handleInput} />
        </div>
        <div>
          author
          <input
            name="author"
            type="text"
            value={newBlog.author}
            onChange={handleInput}
          />
        </div>
        <div>
          url
          <input
            name="url"
            type="text"
            value={newBlog.url}
            onChange={handleInput}
          />
        </div>
        <button id="createbutton" type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm