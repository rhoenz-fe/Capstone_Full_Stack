const supertest = require('supertest');
const app = require('../index');
const Blog = require('../models/blog');
const api = supertest(app);

describe('Blog API', () => {
    test('returns correct amount of blog posts in JSON format', async () => {
        const response = await api.get('/api/blogs');
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        const blogs = await Blog.find({});
        expect(response.body).toHaveLength(blogs.length);
    });
});

describe('Blog API', () => {
    test('unique identifier property is named "id"', async () => {
        const response = await api.get('/api/blogs');
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body[0].id).toBeDefined();
    });
});

describe('Blog API', () => {

    test('creating a new blog post with missing likes defaults to 0', async () => {
        const initialBlogs = await api.get('/api/blogs');

        const newBlog = {
            title: 'title blog',
            author: 'author blog',
            url: 'url blog',
        };

        const response = await api.post('/api/blogs').send(newBlog).expect(201);
        expect(response.body.likes).toBe(0);

        const updatedBlogs = await api.get('/api/blogs');
        expect(updatedBlogs.body).toHaveLength(initialBlogs.body.length + 1);

        const blogTitles = updatedBlogs.body.map((blog) => blog.title);
        expect(blogTitles).toContain(newBlog.title);
    });

    test('deleting a blog post', async () => {
        const initialBlogs = await api.get('/api/blogs');
        const blogToDelete = initialBlogs.body[0];

        await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

        const updatedBlogs = await api.get('/api/blogs');
        const blogIds = updatedBlogs.body.map((blog) => blog.id);
        expect(blogIds).not.toContain(blogToDelete.id);
    });

    test('attempting to delete a non-existent blog post', async () => {
        const invalidId = '1234567890';
        await api.delete(`/api/blogs/${invalidId}`).expect(400);
    });

    test('attempting to delete a blog post with an invalid ID', async () => {
        const invalidId = 'invalid_id';
        await api.delete(`/api/blogs/${invalidId}`).expect(400);
    });

    test('updating a blog post', async () => {
        const initialBlogs = await api.get('/api/blogs');
        const blogToUpdate = initialBlogs.body[0];
    
        const updatedBlog = {
          ...blogToUpdate,
          likes: blogToUpdate.likes + 1,
        };
    
        const response = await api
          .put(`/api/blogs/${blogToUpdate.id}`)
          .send(updatedBlog)
          .expect(200);
    
        expect(response.body.likes).toBe(updatedBlog.likes);
    
        const updatedBlogs = await api.get('/api/blogs');
        const blogLikes = updatedBlogs.body.map((blog) => blog.likes);
    
        expect(blogLikes).toContain(updatedBlog.likes);
      });

})
