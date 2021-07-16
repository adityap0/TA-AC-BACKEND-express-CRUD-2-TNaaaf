let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let authorSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true },
    books: [Schema.Types.ObjectId],
  },
  { timestamps: true }
);
let Author = mongoose.model("Author", authorSchema);
module.exports = Author;
