const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const cp = require('child_process');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
const messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

gulp.task('browser-sync', ['sass', 'jekyll-build', 'webpack',], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

gulp.task('sass', function () {
    return gulp.src('_scss/main.scss')
        .pipe(sass({
            includePaths: ['scss', 'node_modules'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('css'));
});

  files.forEach(a => {
    entry[a] = a;
  });

  return gulp.src('_js/entry.js')
      .pipe(webpackStream({
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
                      loader: 'style!css!sass',
                    },
                  {
                      test: /\.(css)?$/,
                      loader: 'style!css',
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
              },
            plugins: [
              new webpack.optimize.CommonsChunkPlugin({
                filename: 'assets/js/commons.js',
                name: 'commons',
              }),
            ],
          }))
      .pipe(gulp.dest(path.resolve(__dirname, '')))
      .on('close', done);
});

gulp.task('watch', function () {
    gulp.watch('_scss/*.scss', ['sass']);
    gulp.watch(['*.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
    gulp.watch(['js/entry.js'], ['webpack']);
});

gulp.task('default', ['browser-sync', 'watch']);
