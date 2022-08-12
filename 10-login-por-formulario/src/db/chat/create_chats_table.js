const db = require("../database");

const createChatsTable = async () => {
  try {
    await db.sqliteConnection.schema.createTable("chats", (chat) => {
      chat.increments("id").primary();
      chat.string("email").notNullable();
      chat.string("message").notNullable();
      chat.string("time").notNullable();
    });
    console.log("Tabla de chats creada exitosamente");
  } catch (error) {
    console.log(error);
  }
};
module.exports = createChatsTable;
