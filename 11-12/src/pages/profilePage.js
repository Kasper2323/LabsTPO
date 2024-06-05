const { By, until } = require('selenium-webdriver');
const logger = require('../utils/logger');

class ProfilePage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'http://kinoteatr.megamag.by/';
        this.accountInfo = By.xpath('//span[@class="acountInfo" and contains(text(), "Касперович Артём")]');
        this.userProfileLink = By.xpath('//a[@class="accountMenu" and @href="http://kinoteatr.megamag.by/account.php"]');
        this.editProfileLink = By.xpath('//a[@class="accountMenu" and @href="http://kinoteatr.megamag.by/create_account.php"]');
        this.emailInput = By.xpath('//input[@type="text" and @name="email_address" and @value="kasperartom@gmail.com"]');
        this.continueButton = By.xpath('//input[@type="submit" and @class="btn-green-small" and @value="Продолжить"]');
    }

    async open() {
        logger.info(`Opening URL: ${this.url}`);
        await this.driver.get(this.url);
    }

    async editProfile(newEmail) {
        logger.info('Editing user profile');

        await this._waitForElement(this.accountInfo);
        await this._waitForElementVisible(this.accountInfo);

        const accountInfoElement = await this.driver.findElement(this.accountInfo);
        await accountInfoElement.click();

        await this._waitForElement(this.userProfileLink);
        await this._waitForElementVisible(this.userProfileLink);

        const userProfileLinkElement = await this.driver.findElement(this.userProfileLink);
        await userProfileLinkElement.click();

        await this._waitForElement(this.editProfileLink);
        await this._waitForElementVisible(this.editProfileLink);

        const editProfileLinkElement = await this.driver.findElement(this.editProfileLink);
        await editProfileLinkElement.click();

        await this._waitForElement(this.emailInput);
        await this._waitForElementVisible(this.emailInput);

        const emailInputElement = await this.driver.findElement(this.emailInput);
        await emailInputElement.clear();
        await emailInputElement.sendKeys(newEmail);

        await this._waitForElement(this.continueButton);
        await this._waitForElementVisible(this.continueButton);

        const continueButtonElement = await this.driver.findElement(this.continueButton);
        await continueButtonElement.click();

        logger.info('User profile edited successfully.');
    }

    async _waitForElement(locator, timeout = 2000) {
        logger.info(`Waiting for element located by ${locator.toString()}...`);
        await this.driver.wait(until.elementLocated(locator), timeout);
        logger.info('Element located.');
    }

    async _waitForElementVisible(locator, timeout = 2000) {
        logger.info(`Waiting for element ${locator.toString()} to be visible...`);
        const element = await this.driver.findElement(locator);
        await this.driver.wait(until.elementIsVisible(element), timeout);
        logger.info('Element is visible.');
    }
}

module.exports = ProfilePage;
