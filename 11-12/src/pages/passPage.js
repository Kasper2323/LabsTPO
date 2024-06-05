const { By, until } = require('selenium-webdriver');
const logger = require('../utils/logger');

class PassPage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'http://kinoteatr.megamag.by/';
        this.accountInfo = By.xpath('//span[@class="acountInfo" and contains(text(), "Касперович Артём")]');
        this.changePasswordLink = By.xpath('//a[@class="accountMenu" and @href="http://kinoteatr.megamag.by/account_password.php"]');
        this.currentPasswordInput = By.xpath('//input[@name="password_current" and @maxlength="40"]');
        this.newPasswordInput = By.xpath('//input[@name="password_new" and @maxlength="40"]');
        this.confirmPasswordInput = By.xpath('//input[@name="password_confirmation" and @maxlength="40"]');
        this.recaptchaCheckbox = By.xpath('//span[@class="recaptcha-checkbox goog-inline-block recaptcha-checkbox-unchecked rc-anchor-checkbox" and @role="checkbox"]');
        this.continueButton = By.xpath('//input[@type="submit" and @class="btn-green-small" and @value="Продолжить"]');
    }

    async open() {
        logger.info(`Opening URL: ${this.url}`);
        await this.driver.get(this.url);
    }

    async changePassword(currentPassword, newPassword) {
        logger.info('Attempting to change password');

        await this._waitForElement(this.accountInfo);
        await this._waitForElementVisible(this.accountInfo);

        const accountInfoElement = await this.driver.findElement(this.accountInfo);
        await accountInfoElement.click();

        await this._waitForElement(this.changePasswordLink);
        await this._waitForElementVisible(this.changePasswordLink);

        const changePasswordLinkElement = await this.driver.findElement(this.changePasswordLink);
        await changePasswordLinkElement.click();

        await this._waitForElement(this.currentPasswordInput);
        await this._waitForElementVisible(this.currentPasswordInput);

        const currentPasswordInputElement = await this.driver.findElement(this.currentPasswordInput);
        await currentPasswordInputElement.sendKeys(currentPassword);

        await this._waitForElement(this.newPasswordInput);
        await this._waitForElementVisible(this.newPasswordInput);

        const newPasswordInputElement = await this.driver.findElement(this.newPasswordInput);
        await newPasswordInputElement.sendKeys(newPassword);

        await this._waitForElement(this.confirmPasswordInput);
        await this._waitForElementVisible(this.confirmPasswordInput);

        const confirmPasswordInputElement = await this.driver.findElement(this.confirmPasswordInput);
        await confirmPasswordInputElement.sendKeys(newPassword);

        await this._waitForElement(this.recaptchaCheckbox, 20000); // 20 секунд
        await this._waitForElementVisible(this.recaptchaCheckbox, 20000);

        const recaptchaCheckboxElement = await this.driver.findElement(this.recaptchaCheckbox);
        await recaptchaCheckboxElement.click();

        await this._waitForElement(this.continueButton);
        await this._waitForElementVisible(this.continueButton);

        const continueButtonElement = await this.driver.findElement(this.continueButton);
        await continueButtonElement.click();

        logger.info('Password change process completed.');
    }

    async _waitForElement(locator, timeout = 10000) {
        logger.info(`Waiting for element located by ${locator.toString()}...`);
        await this.driver.wait(until.elementLocated(locator), timeout);
        logger.info('Element located.');
    }

    async _waitForElementVisible(locator, timeout = 10000) {
        logger.info(`Waiting for element ${locator.toString()} to be visible...`);
        const element = await this.driver.findElement(locator);
        await this.driver.wait(until.elementIsVisible(element), timeout);
        logger.info('Element is visible.');
    }
}

module.exports = PassPage;
