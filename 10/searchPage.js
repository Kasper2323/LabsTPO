const { By, until, Key } = require('selenium-webdriver');

class SearchPage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'http://kinoteatr.megamag.by/';
        this.searchInput = By.xpath('//input[@id="newsdesk_keyword"]');
        this.searchButton = By.xpath('//a[contains(@class, "btn-green-small")]');
    }

    async open() {
        await this.driver.get(this.url);
    }

    async searchFilm(filmName, isFull) {


        if(isFull){
            await this._clickBoxRegionLink();
            await this._clickMolodechnoLink();
        }
        
        await this._waitForElement(this.searchInput);
        await this._waitForElementVisible(this.searchInput);

        const searchInputElement = await this.driver.findElement(this.searchInput);
        await searchInputElement.sendKeys(filmName, Key.RETURN);

        await this._waitForElement(this.searchButton);
        await this._waitForElementVisible(this.searchButton);

        const searchButtonElement = await this.driver.findElement(this.searchButton);
        await searchButtonElement.click();

    }

    async _waitForElement(locator) {
        console.log(`Waiting for element located by ${locator.toString()}...`);
        await this.driver.wait(until.elementLocated(locator), 10000);
        console.log('Element located.');
    }

    async _waitForElementVisible(locator) {
        console.log(`Waiting for element ${locator.toString()} to be visible...`);
        const element = await this.driver.findElement(locator);
        await this.driver.wait(until.elementIsVisible(element), 10000);
        console.log('Element is visible.');
    }

    async _clickBoxRegionLink() {
        console.log('Clicking on the box-region link...');
        const boxRegionLink = await this.driver.findElement(By.xpath('//a[contains(@class, "box-region")]'));
        await boxRegionLink.click();
        console.log('Box-region link clicked.');
    }

    async _clickMolodechnoLink() {
        console.log('Clicking on the link with text "Молодечно"...');
        const molodechnoLink = await this.driver.findElement(By.xpath('//a[text()="Молодечно"]'));
        await molodechnoLink.click();
        console.log('Link with text "Молодечно" clicked.');
    }
}

module.exports = SearchPage;