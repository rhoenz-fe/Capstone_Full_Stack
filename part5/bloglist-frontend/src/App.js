import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()


  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const updateBlog = async (id, updated) => {
    const updatedBlog = await blogService.update(id, updated)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))

  }

  const deleteBlog = async (id) => {
    try{
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
    }catch (error){
      console.log('Error:', error)
    }

  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('Wrong username or password')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }


  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const handleCreate = async (title, author, url) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create({ 
        title,
        author,
        url,
      })

      setBlogs(blogs.concat(blog))
      setNotification(`A new blog ${title} by ${author} added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification('Failed to add blog')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  return (
    <div>
      <Notification notif={notification} />
      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          setPassword={setPassword}
          password={password} /> :
        <div>
          <h1>BLOGS</h1>
          <p>{user.name} logged in
            <button onClick={handleLogout} type="submit">logout</button></p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm handleCreate={handleCreate} />
          </Togglable>
        </div>
      }
      {user && (
        <div>
          {blogs
            .sort((a,b) => b.likes - a.likes)
            .map(blog => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog = {updateBlog}
                deleteBlog = {deleteBlog}
                username = {user.username} />
            ))}
        </div>
      )}



    </div>
  )
}

export default App