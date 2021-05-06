module.exports = {

    LOCAL: {
        url: process.env.DEV_LOCAL,
        dialect: 'postgres',
    },
    TEST_LOCAL: {
        url: process.env.TEST_ENV,
        dialect: 'postgres',
    }

}