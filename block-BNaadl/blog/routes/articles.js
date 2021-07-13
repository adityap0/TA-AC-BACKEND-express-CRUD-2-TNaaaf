var express = require("express");
var router = express.Router();
let Article = require("../models/article");

//READ
router.get("/", (req, res, next) => {
  Article.find({}, (error, allArticles) => {
    if (error) return next(error);
    res.render("articles", { articles: allArticles });
  });
});
router.get("/new", (req, res) => {
  res.render("newArticleForm");
});
router.get("/:id", (req, res, next) => {
  let id = req.params.id;
  Article.findById(id, (error, article) => {
    if (error) return next(error);
    res.render("articleInfo", { article });
  });
});
//CREATE

router.post("/new", (req, res, next) => {
  Article.create(req.body, (error, createdUser) => {
    if (error) return next(error);
    res.redirect("/articles");
  });
});

module.exports = router;
