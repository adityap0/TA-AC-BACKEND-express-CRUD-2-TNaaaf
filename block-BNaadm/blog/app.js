var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var indexRouter = require("./routes/index");
var articlesRouter = require("./routes/articles");
var commentsRouter = require("./routes/comments");

var app = express();
//connect to Db
mongoose.connect(
  "mongodb://127.0.0.1:27017/blogx",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (error) => {
    console.log(error ? error : "Connected to Db");
  }
);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/articles", articlesRouter);
app.use("/comments", commentsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

// - display webpages to

//   - list all articles(only title)

// - article details page

//   - each article must have fields
//     - title
//     - description
//     - tags -> [String]
//     - author
//     - likes -> Number
//   - button to increament/decrement like
//   - button to edit article
//   - button to delete article

// - article create form

//   - button to go to list article page

// - article update form

//   - button to go to home
//   - button to go to article details page
