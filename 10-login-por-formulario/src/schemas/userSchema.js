const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  pasword: String,
  email: String,
  firstName: String,
  lastName: String,
});

module.exports = mongoose.model("User", userSchema);
