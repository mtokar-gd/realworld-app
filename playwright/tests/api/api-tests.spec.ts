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
    expect (body.data.listBankAccount.map(e => e.bankName)).toContain("Deutsche Bank");
});

test('Delete a bank account', async ({ request }) => {
    const response = await request.post('http://localhost:3002/graphql',
        {    headers: {
            'Cookie': cookies,
          },
            data: {"operationName":"DeleteBankAccount",
            "query":" mutation DeleteBankAccount($id: ID!) { deleteBankAccount(id: $id) } ",
            "variables":{"id":"UIWX1egZi"}
}});
    const body = await response.json();
    console.log(JSON.stringify(body));
    expect(response.status()).toBe(200);
    expect (body.data).toStrictEqual({"deleteBankAccount":true});
});

test('Get a user profile by username', async ({ request }) => {
    const response = await request.get('http://localhost:3002/users/profile/Katharina_Bernier');
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    console.log(JSON.stringify(body));
    expect(response.status()).toBe(200);
    expect (body.user.firstName).toBe('Edgar');
    expect (body.user.lastName).toBe('Johns');
});

test('Get a user information when login',async ({ request }) => {
    const response = await request.post('http://localhost:3002/login',
    { 
        data: {"type":"LOGIN","username":"Tavares_Barrows","password":"s3cret"
}});
    const body = await response.json();
    console.log(JSON.stringify(body));
    expect(response.status()).toBe(200);
    expect(body.user.username).toBe('Tavares_Barrows');
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
    const getResponse = await request.get('http://localhost:3002/comments/-7xanIywv9x',
    {    headers: {
        'Cookie': cookies,
      }});
    const body = await getResponse.json();
    console.log(JSON.stringify(body));
    expect (body.comments.map(e => e.content)).toContain('Hooray');
});

test('Get list of users performing transactions',async ({ request }) => {
        const response = await request.get('http://localhost:3002/transactions',
    {    headers: {
        'Cookie': cookies,
      }
})
    const body = await response.json();
    console.log(JSON.stringify(body));
    expect (response.status()).toBe(200);
    expect (body.results.map(e => e.senderName)).toContain('Edgar Johns');
});

test('Get list of users',async ({ request }) => {
    const response = await request.get('http://localhost:3002/users',
{    headers: {
    'Cookie': cookies,
  }
});
    const body = await response.json();
    console.log(JSON.stringify(body));
    expect (response.status()).toBe(200);
    expect (body.results.map(e => e.username)).toContain('jacksonanna95');

});

})
