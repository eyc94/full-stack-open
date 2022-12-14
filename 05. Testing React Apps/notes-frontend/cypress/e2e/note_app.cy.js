describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Smith',
      username: 'owner',
      password: 'password',
    };
    cy.request('POST', 'http://localhost:3001/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function() {
    cy.contains('Notes');
    cy.contains('Note App, EC 2022');
  });

  it('login form can be opened', function() {
    cy.contains('Login').click();
  });

  it('user can login', function() {
    cy.contains('Login').click();
    cy.get('#username').type('owner');
    cy.get('#password').type('password');
    cy.get('#login-button').click();

    cy.contains('Smith logged-in');
  });

  it('login fails with wrong password', function() {
    cy.contains('Login').click();
    cy.get('#username').type('owner');
    cy.get('#password').type('wrong');
    cy.get('#login-button').click();

    cy.contains('Wrong credentials');
    cy.get('.error').contains('Wrong credentials');
    cy.get('.error').should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid');

    cy.get('html').should('not.contain', 'Smith logged-in');
  });

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'owner', password: 'password' });
    });

    it('a new note can be created', function() {
      cy.createNote({
        content: 'a note created by cypress',
        important: true,
      });
      cy.contains('a note created by cypress');
    });

    describe('and several notes exist', function() {
      beforeEach(function() {
        cy.createNote({ content: 'first note', important: false });
        cy.createNote({ content: 'second note', important: false });
        cy.createNote({ content: 'third note', important: false });
      });

      it('one of those can be made important', function() {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click();
        cy.get('@theButton').should('contain', 'make not important');
      });
    });
  });
});
