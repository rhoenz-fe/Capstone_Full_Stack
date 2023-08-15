describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'username',
      password: 'password',
      name: 'example name'
    }

    cy.request('POST', 'http://localhost:3003/api/users', user)
    // create here a user to backend
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('username')
      cy.get('#password').type('password')
      cy.get('#loginbutton').click()
      cy.contains('example name logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('')
      cy.get('#password').type('')
      cy.get('#loginbutton').click()
      cy.get('#error').should('contain', 'Wrong username or password').and('have.css', 'color', 'rgb(128,0,128)')
      cy.get('html').should('not.contain', 'example name logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'username', password: 'password' })
      cy.createBlog({ title: 'title1', author: 'a1', url: 'url1' })
      cy.createBlog({ title: 'title2', author: 'a1', url: 'url2' })
      cy.createBlog({ title: 'title3', author: 'a1', url: 'url3' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('title of this book')
      cy.get('#author').type('first author')
      cy.get('#url').type('http://exampleurl.com')
      cy.get('#createbutton').click()
      cy.contains('title of this book first author')
    })

    it('like a blog', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('title of this book')
      cy.get('#author').type('first author')
      cy.get('#url').type('http://exampleurl.com')
      cy.get('#createbutton').click()
      cy.contains('title of this book').parent().find('button').click()
      cy.get('#likebutton').click()
      cy.contains('1')
    })

    it ('remove a blog', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('title of this book')
      cy.get('#author').type('first author')
      cy.get('#url').type('http://exampleurl.com')
      cy.get('#createbutton').click()

      cy.contains('title of this book').parent().find('button').click()
      cy.get('#removebutton').click()
      cy.get('html').should('not.contain', 'title of this book first author')
    })

    it ('sorted by likes', function () {
      cy.contains('title3').parent().find('show').click()
      cy.get('#likebutton').click().wait(500).click().wait(500).click().wait(500)
      cy.contains('title2').parent().find('button').click()
      cy.get('#likebutton').click().wait(500).click().wait(500)
      cy.get('.blog').eq(0).should('contain', 'title3')
      cy.get('.blog').eq(1).should('contain', 'title2')
      cy.get('.blog').eq(2).should('contain', 'title1')
    })
  })


})