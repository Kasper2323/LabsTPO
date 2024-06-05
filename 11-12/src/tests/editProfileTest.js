const DriverManager = require('../utils/driverManager');
const ProfilePage = require('../pages/profilePage');
const AuthPage = require('../pages/authPage');
const logger = require('../utils/logger');

async function editProfileTest() {
    const driver = await DriverManager.getDriver('chrome');

    try {
        const authPage = new AuthPage(driver);
        await authPage.open();
        await authPage.login('kasperartom@gmail.com', '102030ttt');
        logger.info('Login test completed successfully.');
        const profilePage = new ProfilePage(driver);
        await profilePage.editProfile('kasperartom1@gmail.com');
        logger.info('Profile edit test completed successfully.');
        return 'Profile edit test passed';
    } catch (error) {
        logger.error(`Profile edit test failed: ${error.message}`);
        return `Profile edit test failed: ${error.message}`;
    } finally {
        await driver.quit();
        logger.info('Browser closed.');
    }
}

module.exports = editProfileTest;
