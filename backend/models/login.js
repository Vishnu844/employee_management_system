const mongoose = require("mongoose");

let loginSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    minLength: [2, "very small name"],
    maxLength: [20, "very big name"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    unique: true,
  },
});

module.exports = mongoose.model("login", loginSchema);
