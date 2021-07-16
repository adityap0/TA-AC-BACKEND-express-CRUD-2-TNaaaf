let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let bookSchema = new Schema(
  {
    title: { type: String, required: true },
    summary: String,
    pages: { type: Number, default: 0 },
    publication: String,
    category: [String],
    cover_image: { type: String, required: true },
    author: String,
  },
  { timestamps: true }
);
let Book = mongoose.model("Book", bookSchema);
module.exports = Book;
