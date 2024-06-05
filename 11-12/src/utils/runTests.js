const loginTest = require('../tests/loginTest');
const bookTicketTest = require('../tests/bookTicketTest');
const changePasswordTest = require('../tests/changePasswordTest');
const editProfileTest = require('../tests/editProfileTest');
const searchFilmTest = require('../tests/searchFilmTest');
const logger = require('./logger');

(async function runAllTests() {
    const results = [];

    try {
        results.push(await loginTest());
        results.push(await bookTicketTest());
        results.push(await changePasswordTest());
        results.push(await editProfileTest());
        results.push(await searchFilmTest());
    } catch (error) {
        logger.error(`An error occurred during the tests: ${error.message}`);
    }

    logger.info('Test results:');
    results.forEach(result => {
        console.log(result);
    });
})();
