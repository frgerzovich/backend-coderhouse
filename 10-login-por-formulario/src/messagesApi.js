const mongoose = require("mongoose");

class MessagesApi {
  constructor(collectionName, schema) {
    this.collection = mongoose.model(
      collectionName,
      new mongoose.Schema(schema, { timestamps: true })
    );
  }

  async send(message) {
    const newMessage = new this.collection(message);

    try {
      const res = await newMessage.save();
      return res;
    } catch (err) {
      console.log("Error guardando chat. Code: ", err);
      return false;
    }
  }

  async getAll() {
    try {
      const messages = await this.collection.find({}, { __v: 0 });
      return messages;
    } catch (err) {
      console.log("Error guardando chat. Code: ", err);
      return false;
    }
  }
}

module.exports = MessagesApi;
