import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from "@testing-library/user-event"
import BlogForm from './BlogForm'

describe("testing front end blog", () => {
    const blog = {
        title: "example title",
        author: "example author",
        url: "example url",
        likes: 23423,
        user: {
            username: "example1",
            name: "example2"
        }
    }

    const mockHandler = jest.fn()

    test('only title and author', () => {
        const component = render(
            <Blog blog={blog} updateBlog={mockHandler} deleteBlog={mockHandler} username={blog.user.username} />
        )
        expect(component.container).toHaveTextContent(
            'example title example author'
        )
    })

    test('like and url after button click', () => {
        const component = render(
            <Blog blog={blog} updateBlog={mockHandler} deleteBlog={mockHandler} username={blog.user.username} />
        )

        const button = component.getByText('show')
        fireEvent.click(button)
        
        expect(component.container).toHaveTextContent(
            'example url'
        )

        expect(component.container).toHaveTextContent(
            '23423'
        )
    })

    test('like button click twice', () => {
        const component = render(
            <Blog blog={blog} updateBlog={mockHandler} deleteBlog={mockHandler} username={blog.user.username} />
        )

        const button = component.getByText('show')
        fireEvent.click(button)

        const likeB = component.getByText('like')
        fireEvent.click(likeB)
        fireEvent.click(likeB)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})

describe('blog form', () => {
    test("blog form test", async () => {
        const mockHandler = jest.fn()
        const user = userEvent.setup()
        const component = render(<BlogForm handleCreate={mockHandler} />)
        const title = component.container.querySelector("input[name='title'")
        const author = component.container.querySelector("input[name='author'")
        const url = component.container.querySelector("input[name='url'")
        const button = screen.getByText('create')

        await user.type(title, 'example title')
        await user.type(author, 'example author')
        await user.type(url, 'example url')
        await user.click(button)

        expect(mockHandler.mock.calls[0][0]).toBe("example title")
        expect(mockHandler.mock.calls[0][1]).toBe("example author")
        expect(mockHandler.mock.calls[0][2]).toBe("example url")
    })
})
