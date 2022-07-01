const fs = require("fs");

class MessagesApi {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async send(message) {
    try {
      const fileData = await fs.promises.readFile(this.fileName, "utf-8");
      const parsedData = JSON.parse(fileData);
      parsedData.push(message);
      await fs.promises.writeFile(this.fileName, JSON.stringify(parsedData));
      return message;
    } catch (error) {
      throw new Error(
        "Ha ocurrido un error escribiendo los datos: " + error.message
      );
    }
  }

  async getAll() {
    try {
      const fileData = await fs.promises.readFile(this.fileName, "utf-8");
      return JSON.parse(fileData);
    } catch (error) {
      throw new Error(
        "Ha ocurrido un error obteniendo los datos: " + error.message
      );
    }
  }
}

module.exports = MessagesApi;
