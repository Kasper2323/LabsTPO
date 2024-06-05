const DriverManager = require('../utils/driverManager');
const AuthPage = require('../pages/authPage');
const logger = require('../utils/logger');

(async function runTest() {
    const driver = await DriverManager.getDriver('chrome');

    try {
        const authPage = new AuthPage(driver);

        await authPage.open();

        await authPage.login('kasperartom@gmail.com', '102030ttt');

        logger.info('Login test completed successfully.');
    } catch (error) {
        logger.error(`Login test failed: ${error.message}`);
    } finally {
        await driver.quit();
        logger.info('Browser closed.');
    }
})();
