const gulp = require('gulp');
const concatCss = require('gulp-concat-css');
const cleanCss = require('gulp-clean-css');
var less = require('gulp-less');
const rename = require('gulp-rename');
const rimraf = require('rimraf');
const browserSync = require("browser-sync");
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
uglify = require('gulp-uglify')
webpack = require('webpack'),
webpackStream = require('webpack-stream');



const reload = browserSync.reload;

// конфиг для browserSync
const config = {
  server: {
    baseDir: "./public/"
  },
  tunnel: true,
  host: 'localhost',
  port: 8080,
  logPrefix: "mihanizm56"
};

const path = {
  build: { //Тут мы укажем куда складывать готовые после сборки файлы
    html: './public/',
    js: './public/js/',
    css: './public/css/',
    less: './public/css/',
    img: './public/img/'
  },
  src: { //Пути откуда брать исходники
    html: './src/index.html', 
    js: './src/js/index.js',
    css: './src/css/main.css',
    less: './src/css/main.less',
    img: './src/img/*.png'
  },
  watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
    html: './src/index.html',
    js: './src/js/*.js',
    css: './src/css/main.css',
    less: './src/css/main.less',
  },
  clean: './public', //Тут мы укажем путь для очистки
};


gulp.task('test', function () {
  console.log('Пройден тест галпа!')
});


gulp.task('clean', function (cb) {
  rimraf(path.clean, cb);
});


gulp.task('html', function () {
  return gulp.src(path.src.html) //Выберем файлы по нужному пути
    .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
    .pipe(reload({ stream: true })); //И перезагрузим наш сервер для обновлений
});


gulp.task('css', function () {
  return gulp.src(path.src.css)
    .pipe(concatCss('bundle.css'))
    .pipe(cleanCss({ compatibility: 'ie8' }))
    .pipe(rename('bundle.min.css'))
    .pipe(gulp.dest(path.build.css));
});

gulp.task('less', function () {
  return gulp.src(path.src.less)
    .pipe(less({ paths: path.src.less }))
    .pipe(cleanCss({ compatibility: 'ie8' }))
    .pipe(rename('bundle.min.css'))
    .pipe(gulp.dest(path.build.less))
    .pipe(reload({ stream: true }));
});


gulp.task('img', function () {
  gulp.src(path.src.img) //Выберем наши картинки
    .pipe(imagemin({ //Сожмем их
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest(path.build.img)) //И бросим в build
    .pipe(reload({ stream: true }));
});


gulp.task('scripts', function () {
  return gulp.src(path.src.js)
    .pipe(webpackStream({
      output: {
        filename: 'index.js',
      },
      module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
              presets: ['env']
            }
          }
        ]
      }
    }))
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({ stream: true }));
});

gulp.task('build', [
  'html',
  'img',
  'less',          // если хотим писать на чистом css - меняем здесь с 'less' на 'css' 
  'scripts'
]);


gulp.task('webserver', function () {
  browserSync(config);
});


gulp.task('watch', function () {
  gulp.watch([path.watch.html], function () {
    gulp.start('html');
  });
  // gulp.watch([path.watch.css], function () {
  //   gulp.start('css');
  // });
  gulp.watch([path.watch.less], function () {
    gulp.start('less');
  });
  gulp.watch([path.watch.js], function () {
    gulp.start('scripts');
  })
});


gulp.task('default', ['build', 'webserver', 'watch']);