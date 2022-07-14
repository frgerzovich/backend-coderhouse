class MessagesApi {
  constructor(db, table) {
    this.db = db;
    this.table = table;
  }

  async send(message) {
    try {
      await this.db(this.table).insert(message);
      return message;
    } catch (error) {
      throw new Error(
        "Ha ocurrido un error escribiendo los datos: " + error.message
      );
    }
  }

  async getAll() {
    try {
      const messages = await this.db.from(this.table).select("*");
      return messages;
    } catch (error) {
      if (error.errno === 1) {
        const createTable = require("./db/chat/create_chats_table");
        await createTable();
      } else {
        throw new Error(
          "Ha ocurrido un error obteniendo los datos: " + error.message
        );
      }
    }
  }
}

module.exports = MessagesApi;
