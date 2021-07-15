var express = require("express");
var router = express.Router();
let Article = require("../models/article");
let Comment = require("../models/comment");
router.get("/:cid/like/:opr/:id", (req, res, next) => {
  let opr = req.params.opr;
  let id = req.params.id;
  let cid = req.params.cid;
  if (opr === "+") {
    Comment.findByIdAndUpdate(cid, { $inc: { likes: 1 } }, (error, comment) => {
      if (error) return next(error);
      res.redirect("/articles/" + id);
    });
  } else {
    Comment.findByIdAndUpdate(
      cid,
      { $inc: { likes: -1 } },
      (error, comment) => {
        if (error) return next(error);
        res.redirect("/articles/" + id);
      }
    );
  }
});
router.get("/:cid/edit/:id", (req, res, next) => {
  let id = req.params.id;
  let cid = req.params.cid;
  Comment.findById(cid, (error, comment) => {
    res.render("commentEditForm", { id, comment });
  });
});
router.post("/:cid/edit/:id", (req, res, next) => {
  let id = req.params.id;
  let cid = req.params.cid;
  Comment.findByIdAndUpdate(cid, req.body, (error, comment) => {
    if (error) return next(error);
    res.redirect("/articles/" + id);
  });
});
router.get("/:cid/delete/:id", (req, res, next) => {
  let id = req.params.id;
  let cid = req.params.cid;
  Comment.findByIdAndDelete(cid, (error, comment) => {
    if (error) return next(error);
    res.redirect("/articles/" + id);
  });
});

module.exports = router;
