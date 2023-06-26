const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe(`when there is initially some notes saved`, () => {
    test(`notes are returned as json`, async () => {
        await api
            .get(`/api/blogs`)
            .expect(200)
            .expect(`Content-Type`, /application\/json/)
    })
})

describe(`new blog`, () => {
    let token = null
    beforeAll(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash(`password`, 10)
        const user = await new User({ username: `username`, passwordHash }).save()
        const userForToken = { username: `username`, id: user.id }
        return (token = jwt.sign(userForToken, config.SECRET))
    })
    test(`valid blog`, async () => {
        const addedBlog = {
            title: `blog title`,
            author: `blog author`,
            url: `blog url`,
            likes: 2132143245,
        }
        await api
            .post(`/api/blogs`)
            .set(`Authorization`, `Bearer ${token}`)
            .send(addedBlog)
            .expect(201)
            .expect(`Content-Type`, /application\/json/)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        const titles = blogsAtEnd.map((blog) => blog.title)
        expect(titles).toContain(`a blog`)
    })
    test(`title and url are missing`, async () => {
        const addedBlog = {
            likes: 1,
        }
        await api
            .post(`/api/blogs`)
            .set(`Authorization`, `Bearer ${token}`)
            .send(addedBlog)
            .expect(400)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

describe(`delete blog`, () => {
    let token = null
    beforeEach(async () => {
        await Blog.deleteMany({})
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash(`password`, 10)
        const user = await new User({ username: `username`, passwordHash }).save()
        const userForToken = { username: `username`, id: user.id }
        token = jwt.sign(userForToken, config.SECRET)
        const addedBlog = {
            title: `blog title`,
            author: `blog author`,
            url: `blog url`,
        }
        await api
            .post(`/api/blogs`)
            .set(`Authorization`, `Bearer ${token}`)
            .send(addedBlog)
            .expect(201)
            .expect(`Content-Type`, /application\/json/)
        return token
    })
})

describe(`updating a blog`, () => {
    test(`valid blog update`, async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({ likes: 10 })
            .expect(200)
        const blogsAtEnd = await helper.blogsInDb()
        const updatedBlog = blogsAtEnd[0]
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
        expect(updatedBlog.likes).toBe(10)
    })
})

afterAll(() => {
    mongoose.connection.close()
})