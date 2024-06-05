const { By, until, Key } = require('selenium-webdriver');
const logger = require('../utils/logger');

class AuthPage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'http://kinoteatr.megamag.by/';
        this.authLink = By.xpath('//a[@class="box-auth" and contains(text(), "Вход")]');
        this.emailInput = By.xpath('//input[@name="email_address" and @placeholder="Электронная почта"]');
        this.passwordInput = By.xpath('//input[@name="password" and @placeholder="Пароль"]');
        this.loginButton = By.xpath('//button[@type="submit" and @class="btn-green" and contains(text(), "Войти")]');
    }

    async open() {
        logger.info(`Opening URL: ${this.url}`);
        await this.driver.get(this.url);
    }

    async login(email, password) {
        logger.info(`Attempting to log in with email: ${email}`);

        await this._waitForElement(this.authLink);
        await this._waitForElementVisible(this.authLink);

        const authLinkElement = await this.driver.findElement(this.authLink);
        await authLinkElement.click();

        await this._waitForElement(this.emailInput);
        await this._waitForElementVisible(this.emailInput);

        const emailInputElement = await this.driver.findElement(this.emailInput);
        await emailInputElement.sendKeys(email);

        await this._waitForElement(this.passwordInput);
        await this._waitForElementVisible(this.passwordInput);

        const passwordInputElement = await this.driver.findElement(this.passwordInput);
        await passwordInputElement.sendKeys(password);

        await this._waitForElement(this.loginButton);
        await this._waitForElementVisible(this.loginButton);

        const loginButtonElement = await this.driver.findElement(this.loginButton);
        await loginButtonElement.click();

        logger.info('Login button clicked.');
    }

    async _waitForElement(locator) {
        logger.info(`Waiting for element located by ${locator.toString()}...`);
        await this.driver.wait(until.elementLocated(locator), 2000);
        logger.info('Element located.');
    }

    async _waitForElementVisible(locator) {
        logger.info(`Waiting for element ${locator.toString()} to be visible...`);
        const element = await this.driver.findElement(locator);
        await this.driver.wait(until.elementIsVisible(element), 2000);
        logger.info('Element is visible.');
    }
}

module.exports = AuthPage;
