// Подключаем необходимые библиотеки
const { Builder, By, Key, until } = require('selenium-webdriver');

// Функция для выполнения тест-кейса
async function runTest() {
    // Создаем экземпляр WebDriver для Chrome
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Открываем браузер и переходим на страницу кинотеатра
        await driver.get('http://kinoteatr.megamag.by/');

        // Находим поле ввода для поиска фильма и вводим текст
        await driver.findElement(By.id('newsdesk_keyword')).sendKeys('Время вернуться', Key.RETURN);

        // Находим элемент с классом news_img и кликаем на него
        await driver.findElement(By.css('.btn-green-small')).click();
    } finally {
        // Закрываем браузер после выполнения тест-кейса
        await driver.quit();
    }
}

// Вызываем функцию для выполнения тест-кейса
runTest();