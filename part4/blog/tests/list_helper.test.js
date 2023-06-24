const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
});

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0,
        },
    ];

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog);
        expect(result).toBe(5);
    });
});

describe('favorite blog', () => {
    const listWithBlogs = [
        {
            _id: '32543523423',
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: '',
            likes: 12,
            __v: 0,
        },
        {
            _id: '5213123123123213',
            title: 'sadasd',
            author: 'sadasdad',
            url: '',
            likes: 7,
            __v: 0,
        },
        {
            _id: '421321312312313',
            title: 'sadasdasd',
            author: 'dad',
            url: '',
            likes: 5,
            __v: 0,
        },
    ];

    test('returns the blog with the most likes', () => {
        const result = listHelper.favoriteBlog(listWithBlogs);
        expect(result).toEqual({
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12,
        });
    });
});

describe("most blogs", () => {
    const listBlog = [
        {
            _id: "123123123",
            title: "1",
            author: "Michael Chan",
            url: "",
            likes: 7213,
            __v: 0,
          },
          {
            _id: "213123123213213",
            title: "2",
            author: "Robert C. Martin",
            url: "",
            likes: 103213,
            __v: 0,
          },
          {
            _id: "12312313",
            title: "3",
            author: "Robert C. Martin",
            url: "",
            likes: 0,
            __v: 0,
          },
          {
            _id: "213213",
            title: "4",
            author: "Robert C. Martin",
            url: "",
            likes: 2213,
            __v: 0,
          },
          {
            _id: "123123123",
            title: "1",
            author: "beb",
            url: "",
            likes: 522,
            __v: 0,
          },
          
    ];

    test("when list has many blogs, equals to Robert C. Martin", () => {
        const result = listHelper.mostBlogs(listBlog);
        expect(result).toEqual({
            author: "Robert C. Martin",
            blogs: 3,
        });
    });
});

describe("most likes", () => {
    const listBlog = [
        {
            _id: "123123123",
            title: "1",
            author: "Michael Chan",
            url: "",
            likes: 7213,
            __v: 0,
          },
          {
            _id: "213123123213213",
            title: "2",
            author: "Robert C. Martin",
            url: "",
            likes: 103213,
            __v: 0,
          },
          {
            _id: "12312313",
            title: "3",
            author: "Robert C. Martin",
            url: "",
            likes: 0,
            __v: 0,
          },
          {
            _id: "213213",
            title: "4",
            author: "Robert C. Martin",
            url: "",
            likes: 2213,
            __v: 0,
          },
          {
            _id: "123123123",
            title: "1",
            author: "beb",
            url: "",
            likes: 522,
            __v: 0,
          }
          
    ];

    test("when list has many likes, equals to Robert C. Martin", () => {
        const result = listHelper.mostLikes(listBlog);
        expect(result).toEqual({
            author: "Robert C. Martin",
            likes: 105426,
        });
    });
});