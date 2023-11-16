describe('New Account', () => {
let users;

    before(() => {
        cy.fixture('users').then(data => {
          users = data;
        });
      });
      
      beforeEach(() => {
        cy.visit('/');
      });

it('should create new user', function () {
    cy.get('[data-test="signup"]').click();
    cy.get('[id="firstName"]').type('Anna');
    cy.get('[id=lastName]').type('Forbes');
    cy.get('[id=username]').type('forbesanna');
    cy.get('[id=password]').type('pwbest');
    cy.get('[id=confirmPassword]').type('pwbest');
    cy.get('[type="submit"]').click();
    cy.contains('Sign in').should('be.visible');
  });

})