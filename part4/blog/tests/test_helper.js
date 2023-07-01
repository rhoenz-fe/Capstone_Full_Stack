const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "blog1",
    author: "author1",
    url: "url1",
    likes: 7123,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "blog2",
    author: "author1",
    url: "url2",
    likes: 2131245,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "blog3",
    author: "author1",
    url: "url3",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "blog4",
    author: "author2",
    url: "url4",
    likes: 122330,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "blog5",
    author: "author3",
    url: "url5",
    likes: 8897,
    __v: 0,
  },
  
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = { initialBlogs, blogsInDb, usersInDb };