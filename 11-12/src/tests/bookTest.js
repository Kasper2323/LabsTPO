const DriverManager = require('../utils/driverManager');
const logger = require('../utils/logger');
const AuthPage = require('../pages/authPage');
const BookPage = require('../pages/bookPage');
const SearchPage = require('../pages/searchPage');

(async function runTest() {
    const driver = await DriverManager.getDriver('chrome');

    try {
        const bookPage = new BookPage(driver);

        const authPage = new AuthPage(driver);
        const searchPage = new SearchPage(driver);

        await authPage.open();

        await authPage.login('kasperartom@gmail.com', '102030ttt');

        await searchPage.searchFilm('Майор Гром: Игра', true, true);

        logger.info('Login test completed successfully.');

        await bookPage.bookTicket();

        logger.info('Test completed successfully.');
    } catch (error) {
        logger.error(`Test failed: ${error.message}`);
    } finally {
        await driver.quit();
        logger.info('Browser closed.');
    }
})();
