const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const htmlmin = require("gulp-htmlmin");
const inject = require('gulp-inject');


// Styles

const styles = () => {
    return gulp.src("source/less/style.less")
        .pipe(plumber())
        .pipe(sourcemap.init())
        .pipe(less())
        .pipe(postcss([
            autoprefixer(),
            csso()
        ]))
        .pipe(sourcemap.write("."))
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("build/css"))
        .pipe(sync.stream());
}

exports.styles = styles;

const css = () => {
  return gulp.src("source/css/normalize.css")
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(rename("normalize.min.css"))
    .pipe(gulp.dest("build/css/"));
}

exports.css = css;

const images = () => {
  return gulp
    .src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({ optimizationLevel: 3 }),
      imagemin.optipng({ progressive: true }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
}

exports.images = images;

const createWebp = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
}

exports.createWebp = createWebp;

const sprite = () => {
  return gulp.src("source/img/icons/*.svg")
    .pipe(rename({prefix: 'icon-'}))
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
}

exports.sprite = sprite;

// Server

const server = (done) => {
    sync.init({
        server: {
            baseDir: 'build'
        },
        cors: true,
        notify: false,
        ui: false,
    });
    done();
}

exports.server = server;

const reload = done => {
  sync.reload();
}

const svginjector = () => {
  const target = gulp.src('./build/*.html');
  const sources = gulp.src(['./build/img/sprite.svg']);

  return target.pipe(inject(sources, {
    transform: function (filePath, file) {
      // return file contents as string
      return file.contents.toString('utf8')
    }}))
    .pipe(gulp.dest('./build'));
}

exports.svginjector = svginjector;

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build/"));
}

exports.html = html;

// Watcher

const watcher = () => {
  gulp.watch("source/img/**/*.{jpg,png}", gulp.series(images));
  gulp.watch("source/img/icons/*.svg", gulp.series(sprite, svginjector));
  gulp.watch("source/less/**/*.less", gulp.series(styles));
  gulp.watch("source/*.html", html);
  gulp.watch("source/*.html").on("change", reload);
}

exports.build = gulp.series(styles, css, html, sprite, images, createWebp, svginjector);


exports.default = gulp.series(
    styles, css, images, sprite, createWebp, html, svginjector, server, watcher
);
