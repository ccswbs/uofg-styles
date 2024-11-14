const gulp = require("gulp");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const gulpIf = require("gulp-if");
const sourcemaps = require("gulp-sourcemaps");

// Check if the environment is production
const isProduction = process.env.NODE_ENV === "production";

gulp.task("styles", () => {
  const plugins = [autoprefixer()];

  if (isProduction) {
    plugins.push(cssnano());
  }

  return gulp
    .src("src/**/*.css")
    .pipe(postcss(plugins, isProduction || { map: { inline: true } }))
    .pipe(gulp.dest("dist"));
})

gulp.task('watch', function() {
  gulp.watch('src/**/*.css', gulp.series('styles'));
});

gulp.task("default", gulp.series("styles"));
