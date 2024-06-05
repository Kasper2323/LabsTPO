const { By, until } = require('selenium-webdriver');
const logger = require('../utils/logger');

class BookPage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'http://kinoteatr.megamag.by/';
        this.timeElement = By.xpath('//a[@class="open_widget" and contains(@href, "seance.php?id=2718585")]');
        this.seatElement = By.xpath('//div[@class="hall__places-chair price-type-1" and text()="1"]');
        this.nextStepButton = By.id('seanceNextStep');
        this.submitButton = By.xpath('//button[@type="submit" and contains(text(), "Далее")]');
    }

    async open() {
        logger.info(`Opening URL: ${this.url}`);
        await this.driver.get(this.url);
    }

    async bookTicket() {
        logger.info('Booking ticket');

        await this._waitForElement(this.timeElement);
        const timeElement = await this.driver.findElement(this.timeElement);
        await timeElement.click();
        logger.info('Clicked on the time element.');

        await this._waitForElement(this.seatElement);
        const seatElement = await this.driver.findElement(this.seatElement);
        await seatElement.click();
        logger.info('Clicked on the seat element.');

        await this._waitForElement(this.nextStepButton);
        const nextStepButton = await this.driver.findElement(this.nextStepButton);
        await nextStepButton.click();
        logger.info('Clicked on the "Next Step" button.');

        await this._waitForElement(this.submitButton);
        const submitButton = await this.driver.findElement(this.submitButton);
        await submitButton.click();
        logger.info('Clicked on the submit button.');

        logger.info('Ticket booked successfully.');
    }

    async _waitForElement(locator, timeout = 2000) {
        logger.info(`Waiting for element located by ${locator.toString()}...`);
        await this.driver.wait(until.elementLocated(locator), timeout);
        logger.info('Element located.');
    }
}

module.exports = BookPage;
