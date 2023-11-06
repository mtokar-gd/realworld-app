import {expect, test} from "@playwright/test";

const apiLikes = 'http://localhost:3000/likes';
const transactionID = 112121212;

test.describe('API-Likes', () => {
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
    });

    test('gets a list of likes for a transaction', async ({ request }) => {
        const newIssue = await request.get(`${apiLikes}`);
        expect(newIssue.ok()).toBeTruthy();
    });

    test('creates a new like for a transaction', async ({ request }) => {
        const newIssue = await request.get(`${apiLikes}/${transactionID}`);
        expect(newIssue.ok()).toBeTruthy();
    });
});
