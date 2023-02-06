const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tagSchema = new Schema({
  tag: {
    type: String,
    required: true,
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
});

module.exports = mongoose.model("Tag", tagSchema);
