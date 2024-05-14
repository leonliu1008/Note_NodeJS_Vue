const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
  id: { type: String },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("todoVue", todoSchema);
