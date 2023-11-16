import { expect, type Locator, type Page } from "@playwright/test";

export class BankAccountPage {
    readonly page: Page;
    readonly accountNumber: Locator;
    readonly bankAccounts: Locator;
    readonly bankName: Locator;
    readonly createButton: Locator;
    readonly routingNumber: Locator;
    readonly saveButton: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.accountNumber = page.locator('input[name="accountNumber"]');
        this.bankAccounts = page.getByText('Bank Accounts');
        this.bankName = page.locator('input[name="bankName"]');
        this.createButton = page.getByText('Create');
        this.routingNumber = page.locator('input[name="routingNumber"]');
        this.saveButton = page.getByText('Save');
    }

    async createBankAccount(bankName){
        await this.createButton.click();
        await this.bankName.click();
        await this.bankName.fill(bankName);
        await this.routingNumber.click();
        await this.routingNumber.fill('123456789');
        await this.accountNumber.click();
        await this.accountNumber.fill('123456789');
        await this.saveButton.click();
    }

    async deleteBankAccount(bankName){
        await this.page
        .locator('li[class="MuiListItem-root MuiListItem-gutters"]')
        .filter({ hasText: bankName })
        .getByRole('button').nth(0)
        .click();
    }
}