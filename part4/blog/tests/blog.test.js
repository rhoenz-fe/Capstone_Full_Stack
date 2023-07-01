const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const helper = require("./test_helper")
const config = require("../utils/config")
const Blog = require("../models/blog")
const User = require("../models/user")

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe("when there is initially some blogs saved", () => {
    test("blogs are returned as json", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    })
})

describe("new blog", () => {
    let token = null
    beforeAll(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash("21314124", 10)
        const user = await new User({ username: "name", passwordHash }).save()
        const userForToken = { username: "name", id: user.id }
        return (token = jwt.sign(userForToken, config.SECRET))
    })
    test("add by authorize user", async () => {
        const addthisBlog = {
            title: "blog",
            author: "author",
            url: "blogurl",
            likes: 10,
        }
        await api
            .post("/api/blogs")
            .set("Authorization", `Bearer ${token}`)
            .send(addthisBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/)
        const resultBlogs = await helper.blogsInDb()
        expect(resultBlogs).toHaveLength(helper.initialBlogs.length + 1)
        const titles = resultBlogs.map((blog) => blog.title)
        expect(titles).toContain("blog")
    })
    test("url and title missing", async () => {
        const addthisBlog = {
            likes: 1,
        }
        await api
            .post("/api/blogs")
            .set("Authorization", `Bearer ${token}`)
            .send(addthisBlog)
            .expect(400)
        const resultBlogs = await helper.blogsInDb()
        expect(resultBlogs).toHaveLength(helper.initialBlogs.length)
    })
})

describe("delete test", () => {
    let token = null
    beforeEach(async () => {
        await Blog.deleteMany({})
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash("3252342", 10)
        const user = await new User({ username: "name", passwordHash }).save()
        const userForToken = { username: "name", id: user.id }
        token = jwt.sign(userForToken, config.SECRET)
        const addthisBlog = {
            title: "blog",
            author: "author",
            url: "hurl",
        }
        await api
            .post("/api/blogs")
            .set("Authorization", `Bearer ${token}`)
            .send(addthisBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/)
        return token
    })
    test("succeeds with status code 204 if id is valid", async () => {
        const blogs = await Blog.find({}).populate("user")
        const deleteblog = blogs[0]
        await api
            .delete(`/api/blogs/${deleteblog.id}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(204)
        const resultBlogs = await Blog.find({}).populate("user")
        expect(resultBlogs).toHaveLength(blogs.length - 1)
        const titles = resultBlogs.map((blog) => blog.title)
        expect(titles).not.toContain(deleteblog.title)
    })

})

describe("updating blog", () => {
    test("valid 200", async () => {
        const blogs = await helper.blogsInDb()
        const updateBlog = blogs[0]
        await api
            .put(`/api/blogs/${updateBlog.id}`)
            .send({ title: "aaa" })
            .expect(200)
        const resultBlogs = await helper.blogsInDb()
        const updatedBlog = resultBlogs[0]
        expect(updatedBlog.title).toBe("aaa")
    })
})

afterAll(() => {
    mongoose.connection.close()
})