class MessagesApi {
  constructor(db, table) {
    this.db = db;
    this.table = table;
  }

  async send(message) {
    try {
      await this.database(this.table).insert(message);
      return message;
    } catch (error) {
      throw new Error(
        "Ha ocurrido un error escribiendo los datos: " + error.message
      );
    }
  }

  async getAll() {
    try {
      const messages = await this.database.from(this.table).select("*");
      return messages;
    } catch (error) {
      throw new Error(
        "Ha ocurrido un error obteniendo los datos: " + error.message
      );
    }
  }
}

module.exports = MessagesApi;
