const DriverManager = require('../utils/driverManager');
const ProfilePage = require('../pages/profilePage');
const AuthPage = require('../pages/authPage');
const logger = require('../utils/logger');

(async function runTest() {
    const driver = await DriverManager.getDriver('chrome');

    try {
        const profilePage = new ProfilePage(driver);

        const authPage = new AuthPage(driver);

        await authPage.open();

        await authPage.login('kasperartom@gmail.com', '102030ttt');

        logger.info('Login test completed successfully.');

        await profilePage.editProfile('kasperartom1@gmail.com');

        logger.info('Profile edit test completed successfully.');
    } catch (error) {
        logger.error(`Profile edit test failed: ${error.message}`);
    } finally {
        await driver.quit();
        logger.info('Browser closed.');
    }
})();
