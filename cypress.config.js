require("dotenv").config();

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://cat.najmcourse.com",
  },
  env: {
    MAILSLURP_API_KEY: process.env.MAILSLURP_API_KEY,
  },
});
