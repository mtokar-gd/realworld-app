import { test, expect, chromium } from '@playwright/test';
import { application } from 'express';
import { Cookie } from 'express-session';
import { session } from 'passport';

const bankAccounts = '/bankaccounts';
const bankAccountId = 'DvEhw9TW3';
let cookies;

test.beforeAll('Login and get cookies',async ( {request} ) => {
    const response = await request.post('http://localhost:3002/login',
    {
        data: {
                "type": "LOGIN",
                "username": "Tavares_Barrows",
                "password": "s3cret"
        }});
        const setCookiesValue = response.headers()['set-cookie'];
        console.log(setCookiesValue);
        console.log(setCookiesValue.substring(0, setCookiesValue.indexOf(";")));
        cookies = setCookiesValue.substring(0, setCookiesValue.indexOf(";"));
})

test.describe('API', () => {


test('Get a list of bank accounts for the user', async ({ request }) => {
    const response = await request.post('http://localhost:3002/graphql',
        {    headers: {
            'Cookie': cookies,
          },
            data: {"operationName":"ListBankAccount",
            "query":" query ListBankAccount { listBankAccount { id uuid userId bankName accountNumber routingNumber isDeleted createdAt modifiedAt } } "
}});
    const body = await response.json();
    console.log(JSON.stringify(body));
    expect(response.status()).toBe(200);
});

test('Delete a bank account', async ({ request }) => {
    //Export bank id from the previous test 
    const response = await request.post('http://localhost:3002/graphql',
        {    headers: {
            'Cookie': cookies,
          },
            data: {"operationName":"DeleteBankAccount",
            "query":" mutation DeleteBankAccount($id: ID!) { deleteBankAccount(id: $id) } ",
            "variables":{"id":"UIWX1egZi"
                }
}});
    const body = await response.json();
    console.log(JSON.stringify(body));
    expect(response.status()).toBe(200);
});

test('Get a user profile by username', async ({ request }) => {
    const response = await request.get('http://localhost:3002/users/profile/Katharina_Bernier');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
});

test('Get a user information when login',async ({ request }) => {
    const response = await request.post('http://localhost:3002/login',
    { 
        data: {"type":"LOGIN","username":"Tavares_Barrows","password":"s3cret"
}});
    const body = await response.json();
    console.log(JSON.stringify(body));
    expect(response.status()).toBe(200);
});

test('Post a comment to a transaction',async ({ request }) => {
    const transactionId = 'lk8AKDAM1CAI';
        const response = await request.post('http://localhost:3002/comments/-7xanIywv9x',
    {    headers: {
        'Cookie': cookies,
      },
        data: {"transactionId":transactionId,"content":"Hooray"
    }});
    expect(response.status()).toBe(200);
});

test('Get list of users performing transactions',async ({ request }) => {
        const response = await request.get('http://localhost:3002/transactions',
    {    headers: {
        'Cookie': cookies,
      }
})
    const body = await response.json();
    console.log(JSON.stringify(body));
    expect(response.status()).toBe(200);
});

test('Get list of users',async ({ request }) => {
    const response = await request.get('http://localhost:3002/users',
{    headers: {
    'Cookie': cookies,
  }
});
expect(response.status()).toBe(200);
});

})
