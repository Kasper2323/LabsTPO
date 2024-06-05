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

    async searchFilm(filmName) {
        console.log('Waiting for search input to be located...');
        await this.driver.wait(until.elementLocated(this.searchInput), 10000);
        console.log('Search input located.');
    
        const searchInputElement = await this.driver.findElement(this.searchInput);
        await this.driver.wait(until.elementIsVisible(searchInputElement), 10000);
        console.log('Search input is visible.');
    
        await searchInputElement.sendKeys(filmName, Key.RETURN);
        console.log('Text entered in search input.');
    
        console.log('Waiting for search button to be located...');
        await this.driver.wait(until.elementLocated(this.searchButton), 10000);
        console.log('Search button located.');
    
        const searchButtonElement = await this.driver.findElement(this.searchButton);
        await this.driver.wait(until.elementIsVisible(searchButtonElement), 10000);
        console.log('Search button is visible.');
    
        await searchButtonElement.click();
        console.log('Search button clicked.');
    }
}

module.exports = SearchPage;