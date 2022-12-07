describe('Note app', function() {
  beforeEach(function() {
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
    cy.get('#username').type('echin');
    cy.get('#password').type('password');
    cy.get('#login-button').click();

    cy.contains('Eric logged-in');
  });

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('Login').click();
      cy.get('#username').type('echin');
      cy.get('#password').type('password');
      cy.get('#login-button').click();
    });

    it('a new note can be created', function() {
      cy.contains('New Note').click();
      cy.get('#new-note-input').type('a note created by cypress');
      cy.contains('save').click();
      cy.contains('a note created by cypress');
    });
  });
});
