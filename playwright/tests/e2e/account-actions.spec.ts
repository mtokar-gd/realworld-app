import { test, expect} from '@playwright/test';
import { tr } from 'date-fns/locale';


test('Register a new account', async ({ page }) => {
        await page.goto('http://localhost:3000/signin'); 
        //Go to New Account page
        const signUp = page.locator('a:has-text("Sign Up")');    
        await page.click('body', {position: {x: 10, y: 10}});  
        await signUp.click();
        //Fill in the input fields 
        await page.locator('input[name="firstName"]').click();
        await page.locator('input[name="firstName"]').fill('Anna');
        await page.locator('input[name="lastName"]').click();
        await page.locator('input[name="lastName"]').fill('Jackson');
        await page.locator('input[name="username"]').click();
        await page.locator('input[name="username"]').fill('jacksonanna95');
        await page.locator('input[name="password"]').click();
        await page.locator('input[name="password"]').fill('weareallfloatinghere');
        await page.locator('input[name="confirmPassword"]').click();
        await page.locator('input[name="confirmPassword"]').fill('weareallfloatinghere');
        //Click Submit button
        const signupButton = page.locator('button[type="submit"]');
        expect(signupButton).toBeEnabled;
        await signupButton.click();

    });


test.describe('Log in with existing account and perform operations', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/signin');
        // Click input[name="username"]
        await page.locator('input[name="username"]').click();
        // Fill input[name="username"]
        await page.locator('input[name="username"]').fill('Tavares_Barrows');
        // Click input[name="password"]
        await page.locator('input[name="password"]').click();
        // Fill input[name="password"]
        await page.locator('input[name="password"]').fill('s3cret');
        // Click [data-test="signin-submit"]
        await Promise.all([
            page.waitForNavigation(/*{ url: 'http://localhost:3000/' }*/),
            page.locator('[data-test="signin-submit"]').click()
        ]);
        await page.waitForSelector('[data-test="app-name-logo"]');
     //   await page.getByTestId('app-name-logo').waitFor({state: "hidden", timeout: 10000});
    })
    
    test('See account details', async ({ page }) => {
        const fullName = page.locator('[data-test="sidenav-username"]');
        expect(fullName).toBeVisible();

    });

    test('See account balance', async ({ page }) => {
        const sideBar = page.locator('div[class="MuiDrawer-root MuiDrawer-docked"]');
        expect(sideBar).toBeVisible();
        const accountBalance = Number((await page.locator('h6[data-test="sidenav-user-balance"]').innerText()).valueOf());
        expect ((accountBalance)).not.toBeNull();
        
    });

    test('See account transaction history', async ({ page }) => {
        const accountHistoryTab = page.getByText('Mine');
        await accountHistoryTab.click();
        await page.waitForSelector('//*[text()="Personal"]');
        const accountHistoryTable = page.locator('div[data-test="transaction-list"]');
        expect (accountHistoryTable).toBeVisible();       
    });

    test('See account transaction details', async ({ page }) => {
        const accountHistoryTab = page.getByText('Mine');
        await accountHistoryTab.click();
        await page.locator('li[data-test^="transaction-item"]').nth(0).click();
        await expect (page.getByText('Transaction Detail')).toBeVisible();
        await expect (page.locator('div[data-test^="transaction-item"]')).toBeVisible();
    });

    test('Update account user settings', async ({ page }) => {
        const userSettings = page.getByText('My Account');
        const emailInput = page.locator('input[name="email"]');
        const saveButton = page.getByText('Save');
        await userSettings.click();
        await emailInput.fill('newemail@yahoo.com')
        await saveButton.click();  

    });
})
