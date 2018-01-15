const gulp = require('gulp');
const bs = require('browser-sync').create();
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const cp = require('child_process');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const path = require('path');
const ghPages = require('gulp-gh-pages');
const minimist = require('minimist');
const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'bundle';
const messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build',
};

let deployOptions = {
  string: ['config', 'branch'],
  default: {
   config: '_config.yml',
   origin: "origin",
   push: true,
   'gh-pages': 'gh-pages'
  }
};

let options = minimist(process.argv.slice(2), deployOptions);

gulp.task('deploy', ['build'], function () {
  return gulp.src('./_site/**/*')
    .pipe(ghPages({
      branch: options['gh-pages'],
      origin: options['origin'],
      push: options['push']
    }));
});

gulp.task('watch', function () {
  gulp.watch([
    '_scss/*.scss',
    '_scss/**/*.scss',
    '_scss/*.css',
    '_scss/**/*.css'
  ], ['rebuild-sass']);
  gulp.watch([
    '*.html',
    '_data/**/*.yml',
    '_layouts/*.html',
    '_includes/*.html',
    '_includes/**/*.html',
    '_posts/**/*.md',
    'pages/**/*.html'
  ], ['jekyll-rebuild']);
  gulp.watch([
    '_js/**/*.js'
  ], ['rebuild-webpack']);
});

gulp.task('default', ['browser-sync', 'watch']);

gulp.task('rebuild-sass', ['sass'], function () {
  return gulp.start('jekyll-rebuild');
});

gulp.task('rebuild-webpack', ['webpack'], function () {
  return gulp.start('jekyll-rebuild');
});

gulp.task('jekyll-build', function (done) {
  bs.notify(messages.jekyllBuild);
  cp.spawnSync(jekyll, ['exec', 'jekyll', 'build', '--config', options.config], { stdio: 'inherit' });
  done();
});

gulp.task('build', ['sass', 'webpack'], function () {
  return gulp.start('jekyll-build');
});

gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  bs.reload();
});

gulp.task('browser-sync', ['build'], function () {
  bs.init({
    server: {
      baseDir: '_site',
      serveStaticOptions: {
        extensions: ['html']
      }
    },
  });
});

gulp.task('browser-sync-reload', function () {
  bs.reload();
});

gulp.task('sass', function () {
  return gulp.src(['_scss/main.scss', '_scss/live.scss', , '_scss/new.scss'])
    .pipe(sass.sync({ outputStyle: 'compressed', includePaths: ['scss', 'node_modules'] }).on('error', sass.logError))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('assets/css'));
});

gulp.task('webpack', function (done) {
  return gulp.src('_js/entry.js')
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest(path.resolve(__dirname, '')))
    .on('close', done);
});
