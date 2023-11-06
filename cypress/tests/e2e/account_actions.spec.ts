import { button } from "aws-amplify";
import { contains } from "cypress/types/jquery";

describe('Account Actions', () => {
let users: any;

before(() => {
  cy.fixture('users').then(data => {
    users = data;
  });
});

beforeEach(() => {
  cy.visit('/');
});

  it('should log in with existing account', function () {
    cy.login(users.testuser.username, users.testuser.password);
    cy.get('[data-test=sidenav-username]').should('exist').contains(users.testuser.username);
  });

  it('should see account details', function(){
    cy.login(users.testuser.username, users.testuser.password);
    cy.get('[class="MuiDrawer-root MuiDrawer-docked"]').should('be.visible');
    cy.get('[data-test=sidenav-username]').should('exist').contains(users.testuser.username);
    cy.contains('My Account').should('be.visible');
  })

  it('should see account balance', function () {
    cy.login(users.testuser.username, users.testuser.password);
    cy.contains('Account Balance').should('exist');
    cy.get('[data-test="sidenav-user-balance"]').should('exist').contains(/\$\d+/);
  });

  it('should see account transactions history', function () {
    cy.login(users.testuser.username, users.testuser.password);
    cy.contains('Mine').click();
    cy.get('div[data-test="transaction-list"]').should('be.visible');
   });

   it('should see account transaction details', function () {
    cy.login(users.testuser.username, users.testuser.password);
    cy.contains('Mine').click();
    cy.get('div[data-test="transaction-list"]').should('be.visible');
    cy.get('li[data-test^="transaction-item"]').eq(0).click();
    cy.contains('Transaction Detail').should('be.visible');
    cy.get('[data-test^="transaction-item"]').should('be.visible');
   });

   it('should update account user settings', function () {
    let newEmail = 'newmail@yahoo.com';
    cy.login(users.testuser.username, users.testuser.password);
    cy.contains('My Account').click();
    cy.get('[name="email"]').clear().type(newEmail);
    cy.contains('Save').click();
   });
   
  
   it('should add new bank account', function () {
    cy.login(users.testuser.username, users.testuser.password);
    cy.contains('Bank Accounts').click();
    cy.contains('Create').click();
    cy.get('[name="bankName"]').type('Deutsche Bank');
    cy.get('[name="routingNumber"]').type('123456789');
    cy.get('[name="accountNumber"]').type('123456789');
    cy.contains('Save').click();
    cy.contains('Deutsche Bank').eq(0).should('be.visible');
   });

   it('should delete bank account', function () {
    cy.login(users.testuser.username, users.testuser.password);
    cy.contains('Bank Accounts').click();
    cy.get('[class="MuiListItem-root MuiListItem-gutters"]')
      .filter(':contains("Deutsche Bank")')
      .contains('Delete')
      .click();
   });


})