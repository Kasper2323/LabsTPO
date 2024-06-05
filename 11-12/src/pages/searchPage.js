const { By, until, Key } = require('selenium-webdriver');
const logger = require('../utils/logger');

class SearchPage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'http://kinoteatr.megamag.by/';
        this.searchInput = By.xpath('//input[@id="newsdesk_keyword"]');
        this.searchButton = By.xpath('//a[contains(@class, "btn-green-small")]');
    }

    async open() {
        logger.info(`Opening URL: ${this.url}`);
        await this.driver.get(this.url);
    }

    async searchFilm(filmName, part1, part2) {
        logger.info(`Searching for film: ${filmName}`);

        if (part1) {
            await this._clickBoxRegionLink();
            await this._clickMolodechnoLink();
        }
        if (part2) {
            await this._waitForElement(this.searchInput);
        await this._waitForElementVisible(this.searchInput);

        const searchInputElement = await this.driver.findElement(this.searchInput);
        await searchInputElement.sendKeys(filmName, Key.RETURN);

        await this._waitForElement(this.searchButton);
        await this._waitForElementVisible(this.searchButton);

        const searchButtonElement = await this.driver.findElement(this.searchButton);
        await searchButtonElement.click();
        }
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

    async _clickBoxRegionLink() {
        logger.info('Clicking on the box-region link...');
        const boxRegionLink = await this.driver.findElement(By.xpath('//a[contains(@class, "box-region")]'));
        await boxRegionLink.click();
        logger.info('Box-region link clicked.');
    }

    async _clickMolodechnoLink() {
        logger.info('Clicking on the link with text "Молодечно"...');
        const molodechnoLink = await this.driver.findElement(By.xpath('//a[text()="Молодечно"]'));
        await molodechnoLink.click();
        logger.info('Link with text "Молодечно" clicked.');
    }
}

module.exports = SearchPage;
