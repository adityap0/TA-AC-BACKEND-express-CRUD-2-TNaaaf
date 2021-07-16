var express = require("express");
var router = express.Router();
let Book = require("../models/book");
let Author = require("../models/author");

//READ
router.get("/", (req, res, next) => {
  Book.find({}, (error, book) => {
    if (error) return next(error);
    res.render("book", book);
  });
});
router.get("/new", (req, res) => {
  res.render("newBookForm");
});
module.exports = router;
