const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || "development";

require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});

const config = {
  development: {
    database: "nc_news",
  },
  test: {
    database: "nc_news_test",
  },
};

const poolConfig = config[ENV];

if (!poolConfig) {
  throw new Error("Database configuration not set for current environment");
}

module.exports = new Pool(poolConfig);
