const knex = require("knex");

const configMySQL = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "sqlcoder",
  },
  pool: { min: 0, max: 7 },
};
const configSQLite3 = {
  client: "sqlite3",
  connection: { filename: "./src/db/chat/chats.sqlite" },
  useNullAsDefault: true,
};

const mysqlConnection = knex(configMySQL);
const sqliteConnection = knex(configSQLite3);

module.exports = { mysqlConnection, sqliteConnection };
