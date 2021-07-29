require('dotenv').config()

module.exports = {
  LOCAL: {
    url: process.env.DEV_LOCAL,
    dialect: 'postgres',
  },
  TEST: {
    url: process.env.DEV_TEST,
    dialect: 'postgres',
  },
  PROD: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
}