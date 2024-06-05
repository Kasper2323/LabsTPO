const DriverManager = require('../utils/driverManager');
const AuthPage = require('../pages/authPage');
const BookPage = require('../pages/bookPage');
const SearchPage = require('../pages/searchPage');
const logger = require('../utils/logger');

async function bookTicketTest() {
    const driver = await DriverManager.getDriver('chrome');

    try {
        const authPage = new AuthPage(driver);
        const searchPage = new SearchPage(driver);
        const bookPage = new BookPage(driver);

        await authPage.open();
        await authPage.login('kasperartom@gmail.com', '102030ttt');
        await searchPage.searchFilm('Майор Гром: Игра', true, true);
        logger.info('Login test completed successfully.');
        await bookPage.bookTicket();
        logger.info('Book ticket test completed successfully.');
        return 'Book ticket test passed';
    } catch (error) {
        logger.error(`Book ticket test failed: ${error.message}`);
        return `Book ticket test failed: ${error.message}`;
    } finally {
        await driver.quit();
        logger.info('Browser closed.');
    }
}

module.exports = bookTicketTest;
