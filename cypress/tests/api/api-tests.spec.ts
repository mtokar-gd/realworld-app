import exp from "constants";
import { connect } from "http2";
import { values } from "lodash";

describe('API Tests', () => {
    let users: any;
  
    before(() => {
        cy.fixture('users').then(data => {
          users = data;
        });
      });
    
      beforeEach(() => {
        cy.loginByApi(users.testuser.username, users.testuser.password);
      });

    it('Get a list of bank accounts for the user', () => {  
        cy.request({method: 'POST', url: 'http://localhost:3002/graphql', 
        headers:{
            'Cookie': cy.getCookie('connect.sid')    
    },
        body: {
            "operationName":"ListBankAccount",
            "query":" query ListBankAccount { listBankAccount { id uuid userId bankName accountNumber routingNumber isDeleted createdAt modifiedAt } } "

            }})
            .then((response) =>{
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
                });
        
    });


      it('Delete bank account', () => {
        cy.request({method: 'POST', url: 'http://localhost:3002/graphql', 
        headers:{
            'Cookie': cy.getCookie('connect.sid')    
    },
        body: {
            "operationName":"DeleteBankAccount",
            "query":" mutation DeleteBankAccount($id: ID!) { deleteBankAccount(id: $id) } ",
            "variables":{"id":"UIWX1egZi"

            }}})
            .then((response) =>{
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
                });       
    });

    it('Get a user profile by username', () => {
        cy.request({method: 'GET', url: 'http://localhost:3002/users/profile/Katharina_Bernier', 
 })
            .then((response) =>{
                expect(response.status).to.eq(200)
                });       
    });

    it('Get a user information when login', () => {
        cy.request({method: 'POST', url: 'http://localhost:3002/login', 
        body: {
            "type":"LOGIN","username":"Tavares_Barrows","password":"s3cret"
            }})
            .then((response) =>{
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
                });       
    });

    it('Post a comment to a transaction', () => {
        let transactionId = '183VHWyuQMS';
        cy.request({method: 'POST', url: 'http://localhost:3002/comments/183VHWyuQMS', 
        headers:{
            'Cookie': cy.getCookie('connect.sid')    
    },
        body: {
            "transactionId":transactionId,"content":"Hooray"
            }})
            .then((response) =>{
                expect(response.status).to.eq(200)
                });       
    });

    it('Get a list of users performing tranactions', () => {
        cy.request({method: 'GET', url: 'http://localhost:3002/transactions', 
        headers:{
            'Cookie': cy.getCookie('connect.sid')    
    }})
            .then((response) =>{
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
                });       
    });


    it('Get a list of users', () => {
        cy.request({method: 'GET', url: 'http://localhost:3002/users', 
        headers:{
            'Cookie': cy.getCookie('connect.sid')    
    }})
            .then((response) =>{
                expect(response.status).to.eq(200)
                });       
    });






  });
  