const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: false,
    },
    body: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
      required: false,
    },
    sticky: {
      type: Boolean,
      default: true,
      index: true,
    },
    // This is how it should look maybe?
    // tags: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Tag",
    //   },
    // ],
    // required: false,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
