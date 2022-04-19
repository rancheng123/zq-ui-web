'use strict';
// 组件样式文件copy
const { series, src, dest } = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
let config = {
    packagePath: './src/packages/'
}

function compile() {
  return src(config.packagePath + 'theme-chalk/src/*.less')
    .pipe(less())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['> 0.15% in CN'],
        cascade: false,
      })
    )
    .pipe(cssmin())
    .pipe(dest(`./lib/theme-chalk`));
}

function copyfont() {
    return src('./packages/theme-chalk/src/fonts/**')
        .pipe(cssmin())
        .pipe(dest('./lib/theme-chalk/fonts'));
}

exports.build = series(compile, copyfont);
