const gulp = require('gulp');
const bs = require('browser-sync').create();
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const cp = require('child_process');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const ghPages = require('gulp-gh-pages');

const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
const messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build',
  };

gulp.task('deploy', ['build'], function () {
    return gulp.src('./_site/**/*')
      .pipe(ghPages());
  });

gulp.task('watch', function () {
    gulp.watch(['_scss/*.scss', '_scss/*.css'], ['rebuild-sass']);
    gulp.watch(['*.html', '_layouts/*.html', '_includes/*.html', '_posts/**/*.md', '_pages/**/*.html'], ['jekyll-rebuild']);
    gulp.watch(['_js/**/*.js'], ['rebuild-webpack']);
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
    cp.spawnSync(jekyll, ['build'], { stdio: 'inherit' });
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

    return gulp.src('_scss/main.scss')
        .pipe(sass.sync({ outputStyle: 'compressed', includePaths: ['scss', 'node_modules'] }).on('error', sass.logError))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('assets/css'));
  });

gulp.task('webpack', function (done) {

  const files = fs.readdirSync('./_js/').filter(a => a.indexOf('.js') > -1).map(a => a.replace('.js', ''));
  const entry = {};

  files.forEach(a => {
    entry[a] = a;
  });

  return gulp.src('_js/entry.js')
      .pipe(webpackStream({
            context: __dirname + '/assets',
            entry: entry,
            module: {
              loaders: [
                  {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=assets/js/[hash].[ext]',
                  },
                  {
                    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file-loader?name=assets/js/[hash].[ext]',
                  },
                  {
                      test: /\.(sass|scss)?$/,
                      loader: 'style!css?minimize!sass',
                    },
                  {
                      test: /\.(css)?$/,
                      loader: 'style!css?minimize',
                    },
              ],
            },
            resolve: {
                modulesDirectories: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, '_js'),
                ],
                root: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, '_js'),
                ],
              },
            output: {
                path: path.join(__dirname, '_js'),
                filename: 'assets/js/[name].bundle.js',
                chunkFilename: 'assets/js/[id].chunk.js',
                publicPath: '/'
              },
            plugins: [
              new webpack.optimize.CommonsChunkPlugin({
                filename: 'assets/js/commons.js',
                name: 'commons',
              }),
              new webpack.optimize.UglifyJsPlugin({
                  compress: {
                    warnings: false
                  }
              })
            ],
          }))
      .pipe(gulp.dest(path.resolve(__dirname, '')))
      .on('close', done);
});
