const normalize = require("normalizr").normalize;
const schema = require("normalizr").schema;
const denormalize = require("normalizr").denormalize;
const util = require("util");

function print(obj) {
  console.log(util.inspect(obj, false, 12, true));
}

function normalizeMessages(mensajes) {
  const author = new schema.Entity("author");

  const message = new schema.Entity(
    "message",
    { author: author },
    { idAttribute: "_id" }
  );

  const schemaMessages = new schema.Entity("messages", {
    messages: [message],
  });

  const normalizedPost = normalize(
    { id: "messages", messages },
    schemaMessages
  );

  /*   print(normalizedPost) */

  return normalizedPost;
}

module.exports = normalizeMessages;
