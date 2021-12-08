const mongoose = require("mongoose");

const UserSchema2 = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: "teachers" }
);

const model = mongoose.model("UserSchema2", UserSchema2);

module.exports = model;
