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
//Increase/Decrease Likes
router.get("/:id/like/:opr", (req, res, next) => {
  let opr = req.params.opr;
  let id = req.params.id;
  console.log(opr);
  if (opr === "+") {
    Article.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (error, updated) => {
      if (error) return next(error);
      res.redirect("/articles/" + id);
    });
  } else {
    Article.findByIdAndUpdate(id, { $inc: { likes: -1 } }, (error, updated) => {
      if (error) return next(error);
      res.redirect("/articles/" + id);
    });
  }
});
//EDIT ARTICLE INFO
router.get("/:id/edit", (req, res, next) => {
  let id = req.params.id;
  Article.findById(id, (error, article) => {
    if (error) return next(error);
    article.tags = article.tags.join(" ").toLocaleLowerCase();
    res.render("articleEditForm", { article });
  });
});
router.post("/:id/edit", (req, res, next) => {
  let id = req.params.id;
  req.body.tags = req.body.tags.toUpperCase().trim().split(" ");
  Article.findByIdAndUpdate(id, req.body, (error, article) => {
    if (error) return next(error);
    res.redirect("/articles/" + id);
  });
});
router.get("/:id/delete", (req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndDelete(id, (error, deletedArticle) => {
    if (error) return next(error);
    res.redirect("/articles");
  });
});
//CREATE

router.post("/new", (req, res, next) => {
  req.body.tags = req.body.tags.toUpperCase().trim().split(" ");
  Article.create(req.body, (error, createdUser) => {
    if (error) return next(error);
    res.redirect("/articles");
  });
});

module.exports = router;
