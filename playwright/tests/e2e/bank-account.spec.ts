import { test, expect} from '@playwright/test';

const bankName = 'Deutsche Bank'

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
    })

    test('Add new bank account', async ({ page }) => {
        const bankAccounts = page.getByText('Bank Accounts');
        const createButton = page.getByText('Create');
        const saveButton = page.getByText('Save');
        await bankAccounts.click();
        await createButton.click();
        await page.locator('input[name="bankName"]').click();
        await page.locator('input[name="bankName"]').fill(bankName);
        await page.locator('input[name="routingNumber"]').click();
        await page.locator('input[name="routingNumber"]').fill('123456789');
        await page.locator('input[name="accountNumber"]').click();
        await page.locator('input[name="accountNumber"]').fill('123456789');
        await saveButton.click();
        await expect(page.getByText(bankName).nth(0)).toBeVisible();
    });

    test('Delete bank account', async ({ page }) => {
        const bankAccounts = page.getByText('Bank Accounts');
        await bankAccounts.click();
        await page
            .locator('li[class="MuiListItem-root MuiListItem-gutters"]')
            .filter({ hasText: bankName })
            .getByRole('button').nth(0)
            .click()
    });
})