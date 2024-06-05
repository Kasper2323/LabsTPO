// Подключаем необходимые библиотеки
const { Builder } = require('selenium-webdriver');
const SearchPage = require('./searchPage');

(async function runTest() {
    // Создаем экземпляр WebDriver для Chrome
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Создаем экземпляр Page Object для страницы поиска
        let searchPage = new SearchPage(driver);

        // Открываем страницу кинотеатра
        await searchPage.open();

        // Выполняем поиск фильма
        await searchPage.searchFilm('Время вернуться');
    } finally {
        // Закрываем браузер после выполнения тест-кейса
        await driver.quit();
    }
})();