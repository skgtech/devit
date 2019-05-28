import gulp, { dest, series, watch, start } from "gulp";
const browsersync = require("browser-sync").create();
import { sync, logError } from "gulp-sass";
import prefix from "gulp-autoprefixer";
import plumber from "gulp-plumber";
import { spawnSync } from "child_process";
import webpackStream from "webpack-stream";
import webpackConfig from "./webpack.config.js";
import { resolve } from "path";
import minimist from "minimist";
const jekyll = process.platform === "win32" ? "jekyll.bat" : "bundle";
import { init, write } from "gulp-sourcemaps";

const messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

let defaultOptions = {
  string: ["config", "branch"],
  default: {
    config: "_config.yml"
  }
};

let options = minimist(process.argv.slice(2), defaultOptions);

function watchFiles(done) {
  watch(
    ["_scss/*.scss", "_scss/**/*.scss", "_scss/*.css", "_scss/**/*.css"],
    [rebuildSass]
  );

  watch(
    [
      "*.html",
      "_data/**/*.yml",
      "_layouts/*.html",
      "_includes/*.html",
      "_includes/**/*.html",
      "_posts/**/*.md",
      "pages/**/*.html"
    ],
    [jekyllRebuild]
  );

  watch(["_js/**/*.js"], [rebuildWebpack]);

  done();
}

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "_site",
      serveStaticOptions: {
        extensions: ["html"]
      }
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean assets
function clean() {
  return del(["./_site/assets/"]);
}

function develop(done) {
  series(browserSync, watchFiles);
  done();
}

function rebuildSass() {
  sass, () => start(jekyllRebuild);
}

function rebuildWebpack() {
  webpack, () => start(jekyllRebuild);
}

function jekyllBuild(done) {
  browsersync.notify(messages.jekyllBuild);
  spawnSync(jekyll, ["exec", "jekyll", "build", "--config", options.config], {
    stdio: "inherit"
  });
  done();
}

function build(done) {
  series(sass, webpack);
  // sass, webpack, () => start(jekyllBuild);
  done();
}

function jekyllRebuild() {
  jekyllBuild,
    () => {
      browsersync.reload();
    };
}

function sass() {
  return gulp
    .src([
      "_scss/main.scss",
      "_scss/legacy/live.scss",
      "_scss/legacy/legacy.scss"
    ])
    .pipe(init())
    .pipe(
      sync({
        outputStyle: "compressed",
        includePaths: ["scss", "node_modules"]
      }).on("error", logError)
    )
    .pipe(
      prefix(["last 15 versions", "> 1%", "ie 8", "ie 7"], { cascade: true })
    )
    .pipe(write())
    .pipe(dest("assets/css"));
}

function webpack() {
  series(done =>
    src("_js/entry.js")
      .pipe(webpackStream(webpackConfig))
      .pipe(dest(resolve(__dirname, "")))
      .on("close", done)
  );
}

// define complex tasks
const js = gulp.series(scriptsLint, scripts);
const build = gulp.series(clean, gulp.parallel(css, images, jekyll, js));
const watch = gulp.parallel(watchFiles, browserSync);

// export tasks
exports.images = images;
exports.css = css;
exports.js = js;
exports.jekyll = jekyll;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = build;
