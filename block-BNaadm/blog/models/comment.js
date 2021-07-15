let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let commentSchema = new Schema(
  {
    content: { type: String, required: true },
    articleID: Schema.Types.ObjectId,
    likes: { type: Number, default: 0 },
    author: { type: String, required: true },
  },
  { timestamps: true }
);
let Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
