var gulp = require("gulp");
var uglify = require("gulp-uglify");
var cssMinify = require("gulp-clean-css");
var useref = require("gulp-useref");
var gulpIf = require("gulp-if");
var gutil = require('gulp-util');
var shell = require("gulp-shell");

var advices = "public/advices/*";
var partials = ["public/partials/*","!public/partials/header.html"];
var res = "public/res/*";
var bower = "public/bower.json";
var favicon = "public/favicon.ico";
var header = "public/partials/header.html";
var fonts  = "public/bower_components/font-awesome/fonts/*";
var reviews = "public/js/reviews.json";

var tasks = ["buildPublic","joinMinify","runServer"];

gulp.task("joinMinify",()=>{
  gulp.src(header)
  .pipe(useref())
  .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
  .pipe(gulpIf("*.js",uglify()))
  .pipe(gulpIf("*.css",cssMinify({inline:['all']})))
  .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
  .pipe(gulp.dest("dist/public/partials"));
  gulp.start("runServer");
});

gulp.task("buildPublic",()=>{
  gulp.src(advices)
  .pipe(gulp.dest("dist/public/advices"));
  gulp.src(partials)
  .pipe(gulp.dest("dist/public/partials"));
  gulp.src(res)
  .pipe(gulp.dest("dist/public/res"));
  gulp.src(bower)
  .pipe(gulp.dest("dist/public/"));
  gulp.src(favicon)
  .pipe(gulp.dest("dist/public/"));
  gulp.src(fonts)
  .pipe(gulp.dest("dist/public/fonts"));
  gulp.src(reviews)
  .pipe(gulp.dest("dist/public/js"));
  gulp.start("joinMinify");
});

gulp.task("runServer",shell.task([
  "node server.js"
]));

gulp.task("build",["buildPublic"]);
