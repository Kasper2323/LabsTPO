const DriverManager = require('../utils/driverManager');
const PassPage = require('../pages/passPage');
const AuthPage = require('../pages/authPage');
const logger = require('../utils/logger');

(async function runTest() {
    const driver = await DriverManager.getDriver('chrome');

    try {
        const authPage = new AuthPage(driver);

        await authPage.open();

        await authPage.login('kasperartom@gmail.com', '102030ttt');

        logger.info('Login test completed successfully.');

        const passPage = new PassPage(driver);

        await passPage.open();

        await passPage.changePassword('102030ttt', '102030rrr');

        logger.info('Password change test completed successfully.');
    } catch (error) {
        logger.error(`Password change test failed: ${error.message}`);
    } finally {
        await driver.quit();
        logger.info('Browser closed.');
    }
})();
