import { test, expect} from '@playwright/test';
import { tr } from 'date-fns/locale';
import { HomePage } from './homepage';


test('Register a new account', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.goto();   
        await page.click('body', {position: {x: 10, y: 10}});  
        await homePage.signUp.click();
        await homePage.fillSignupForm();
        expect(homePage.signUpButton).toBeEnabled;
        await homePage.signUpButton.click();
        await expect (page.getByText('Sign in', {exact : true})).toBeVisible();
    });


test.describe('Log in with existing account and perform operations', () => {
    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.goto();
        await homePage.fillSigninForm();
        await Promise.all([
            page.waitForNavigation(/*{ url: 'http://localhost:3000/' }*/),
            homePage.signInButton.click()
        ]);
       await homePage.waitForLogo();
    })
    
    test('See account details', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.sideBar.click();
        expect(homePage.fullName).toBeVisible();
        expect(homePage.fullName).toContainText('Anna');
    });

    test('See account balance', async ({ page }) => {
        const homePage = new HomePage(page);
        expect(homePage.sideBar).toBeVisible();
        const accountBalance = (await homePage.userBalance.innerText());
        expect (accountBalance).toEqual('$0.00');
    });

    test('See account transaction history', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.accountHistoryTab.click();
        await homePage.waitForLogo();
        expect (homePage.accountHistoryTable).toBeVisible();       
    });

    test('See account transaction details', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.accountHistoryTab.click();
        await homePage.transactionItem.nth(0).click();
        await expect (page.getByText('Transaction Detail')).toBeVisible();
        await expect (homePage.transactionItem).toBeVisible();
    });

    test('Update account user settings', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.userSettings.click();
        await homePage.emailInput.fill('newemail@yahoo.com')
        await homePage.saveButton.click();  
        await expect (homePage.emailInput).toHaveValue('newemail@yahoo.com');
    });
})
