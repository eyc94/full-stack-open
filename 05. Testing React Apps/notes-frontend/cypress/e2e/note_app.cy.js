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
      cy.contains('Login').click();
      cy.get('#username').type('owner');
      cy.get('#password').type('password');
      cy.get('#login-button').click();
    });

    it('a new note can be created', function() {
      cy.contains('New Note').click();
      cy.get('#new-note-input').type('a note created by cypress');
      cy.contains('save').click();
      cy.contains('a note created by cypress');
    });

    describe('and a note exists', function() {
      beforeEach(function () {
        cy.contains('New Note').click();
        cy.get('#new-note-input').type('another note created by cypress');
        cy.contains('save').click();
      });

      it('it can be made important', function() {
        cy.contains('another note created by cypress')
          .contains('make important')
          .click();

        cy.contains('another note created by cypress')
          .contains('make not important');
      });
    });
  });
});
