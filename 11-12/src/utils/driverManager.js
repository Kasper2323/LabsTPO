const { Builder } = require('selenium-webdriver');

class DriverManager {
    static async getDriver(browser = 'chrome') {
        return new Builder().forBrowser(browser).build();
    }
}

module.exports = DriverManager;
