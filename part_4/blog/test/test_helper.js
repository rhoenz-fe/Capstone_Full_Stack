const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    _id: "1",
    title: "blog1",
    author: "author1",
    url: "url1",
    likes: 7123,
    __v: 0,
  },
  {
    _id: "2",
    title: "blog2",
    author: "author1",
    url: "url2",
    likes: 2131245,
    __v: 0,
  },
  {
    _id: "3",
    title: "blog3",
    author: "author1",
    url: "url3",
    likes: 12,
    __v: 0,
  },
  {
    _id: "4",
    title: "blog4",
    author: "author2",
    url: "url4",
    likes: 122330,
    __v: 0,
  },
  {
    _id: "5",
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