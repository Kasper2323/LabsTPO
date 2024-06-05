const DriverManager = require('../utils/driverManager');
const SearchPage = require('../pages/searchPage');
const logger = require('../utils/logger');

async function searchFilmTest() {
    const driver = await DriverManager.getDriver('chrome');

    try {
        const searchPage = new SearchPage(driver);
        await searchPage.open();
        await searchPage.searchFilm('Время вернуться', true, true);
        logger.info('Search film test completed successfully.');
        return 'Search film test passed';
    } catch (error) {
        logger.error(`Search film test failed: ${error.message}`);
        return `Search film test failed: ${error.message}`;
    } finally {
        await driver.quit();
        logger.info('Browser closed.');
    }
}

module.exports = searchFilmTest;
