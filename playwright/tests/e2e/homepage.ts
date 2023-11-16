import { expect, type Locator, type Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly accountHistoryTab: Locator;
    readonly accountHistoryTable: Locator;
    readonly emailInput: Locator;
    readonly fullName: Locator;
    readonly saveButton: Locator;
    readonly sideBar: Locator;
    readonly signUp: Locator;
    readonly signInButton: Locator;
    readonly signUpButton: Locator;
    readonly transactionItem: Locator;
    readonly userBalance: Locator;
    readonly userSettings: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly username: Locator;
    readonly password: Locator;
    readonly confirmPassword: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accountHistoryTab = page.getByText('Mine');
        this.accountHistoryTable = page.locator('div[data-test="transaction-list"]');
        this.emailInput = page.locator('input[name="email"]');
        this.fullName = page.locator('[data-test="sidenav-user-full-name"]');
        this.saveButton = page.getByText('Save');
        this.sideBar = page.locator('div[class="MuiDrawer-root MuiDrawer-docked"]');
        this.signUp = page.locator('a:has-text("Sign Up")');
        this.signInButton = page.locator('[data-test="signin-submit"]');
        this.signUpButton = page.locator('button[type="submit"]');
        this.transactionItem = page.locator('[data-test^="transaction-item"]');
        this.userBalance = page.locator('h6[data-test="sidenav-user-balance"]');
        this.userSettings = page.getByText('My Account');
        this.firstName = page.locator('input[name="firstName"]');
        this.lastName = page.locator('input[name="lastName"]');
        this.username = page.locator('input[name="username"]');
        this.password = page.locator('input[name="password"]');
        this.confirmPassword = page.locator('input[name="confirmPassword"]');
    }

    async goto(){
        await this.page.goto('http://localhost:3000/signin');
    }

    async fillSignupForm(){
        await this.firstName.click();
        await this.firstName.fill('Anna');
        await this.lastName.click();
        await this.lastName.fill('Jackson');
        await this.username.click();
        await this.username.fill('jacksonanna95');
        await this.password.click();
        await this.password.fill('weareallfloatinghere');
        await this.confirmPassword.click();
        await this.confirmPassword.fill('weareallfloatinghere');
    }

    async fillSigninForm(){
        await this.username.click();
        await this.username.fill('jacksonanna95');
        await this.password.click();
        await this.password.fill('weareallfloatinghere');
    }

    async waitForLogo(){
        await this.page.waitForSelector('[data-test="app-name-logo"]');
    }
}