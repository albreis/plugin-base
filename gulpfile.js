const { watch, series, src, dest } = require('gulp');
const stylus = require('gulp-stylus');
const jade = require('gulp-jade');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

let stylusTask = () => {
  return src('./src/stylus/main.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus({compress: true}))
    .pipe(rename('main.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./'))
    .pipe(browserSync.reload({
       stream: true
    }));
}

exports.stylus = stylusTask

let javascriptTask = () => {
  return src(['./src/javascript/**/*.js', './src/main.gulp.js'])
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./'))
    .pipe(browserSync.reload({
       stream: true
    }));
}

exports.javascript = javascriptTask

let jadeTask = () => {
  return src('./src/jade/index.jade')
    .pipe(jade({pretty: true}))
    .pipe(dest('./'))
    .pipe(browserSync.reload({
       stream: true
    }));
}

exports.jade = jadeTask

exports.default = series(jadeTask, stylusTask, javascriptTask)

exports.watch = () => {
  browserSync.init({
     server: {
        baseDir: '.',
        host: '0.0.0.0',
        port: 3000
     },
  })
  watch('./src/stylus/**/*.styl', stylusTask)
  watch('./src/jade/**/*.jade', jadeTask)
  watch('./src/javascript/**/*.js', javascriptTask)
}