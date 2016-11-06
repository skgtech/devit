const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const cp = require('child_process');
const webpack = require('webpack-stream');
const path = require('path');

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

gulp.task('webpack', function(done) {
    return gulp.src('js/entry.js')
        .pipe(webpack({
              module: {
                loaders: [
                    {
                      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                      loader: "url-loader?limit=10000&mimetype=application/font-woff"
                    },
                    { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
                    {
                        test: /\.(sass|scss|css)?$/,
                        loader: 'style!css!sass'
                    }
                ],
            },
            resolve: {
                modulesDirectories: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'js')
                ],
                root: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'js')
                ]
            },
            output: {
                filename: '[name].bundle.js',
            }
        }))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('_site/js'));
});

gulp.task('watch', function () {
    gulp.watch('_scss/*.scss', ['sass']);
    gulp.watch(['*.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
    gulp.watch(['js/entry.js'], ['webpack']);
});

gulp.task('default', ['browser-sync', 'watch']);
