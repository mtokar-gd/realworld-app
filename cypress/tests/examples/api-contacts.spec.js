describe('Contacts', () => {
  let users;

  before(() => {
    cy.fixture('users').then(data => {
      users = data;
    });
  });

  beforeEach(() => {
    cy.loginByApi(users.testuser.username, users.testuser.password);
  });

  it.only('should get contacts', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env("apiUrl")}/transactions/contacts`,
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('results');
    });
  });
});
