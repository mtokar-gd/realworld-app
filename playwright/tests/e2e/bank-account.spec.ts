import { test, expect} from '@playwright/test';
import exp from 'constants';
import { HomePage } from './homepage';
import { BankAccountPage } from './bank-account-page';

const bankName = 'Deutsche Bank'

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

    test('Add new bank account', async ({ page }) => {
        const bankAccountPage = new BankAccountPage(page);
        await bankAccountPage.bankAccounts.click();
        await bankAccountPage.createBankAccount(bankName);
        await expect(page.getByText(bankName).nth(0)).toBeVisible();
    });

    test('Delete bank account', async ({ page }) => {
        const bankAccountPage = new BankAccountPage(page);
        await bankAccountPage.bankAccounts.click();
        await bankAccountPage.deleteBankAccount(bankName);
        await expect (page.getByText(bankName).nth(0)).toContainText(bankName + ' (Deleted)');
    });
})