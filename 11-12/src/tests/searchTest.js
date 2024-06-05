const DriverManager = require('../utils/driverManager');
const SearchPage = require('../pages/searchPage');
const logger = require('../utils/logger');

(async function runTest() {
    const driver = await DriverManager.getDriver('chrome');

    try {
        const searchPage = new SearchPage(driver);

        await searchPage.open();

        await searchPage.searchFilm('Время вернуться', true, true);

        logger.info('Test completed successfully.');
    } catch (error) {
        logger.error(`Test failed: ${error.message}`);
    } finally {
        await driver.quit();
        logger.info('Browser closed.');
    }
})();
