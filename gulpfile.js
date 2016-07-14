var gulp = require('gulp');
var sequence = require('run-sequence');
var typescript = require('gulp-typescript');
var inlineNg2Template = require('gulp-inline-ng2-template');
var tslint = require('gulp-tslint');

var del = require('del');
var path = require('path');
var karma = require('karma');
var browserSync = require('browser-sync').create();
var Builder = require('systemjs-builder');

var BASE_PATH = 'src';
var PATHS = {
  index: BASE_PATH + '/index.html',
  src: BASE_PATH + '/**/*.ts',
  css: BASE_PATH + '/**/*.css',
  tests: BASE_PATH + '/**/*.spec.ts',
  e2eTests: BASE_PATH + '/**/*.e2e.ts',
  bundleFile: 'bundle.js',
  tsconfig: 'tsconfig.json',
  tmp: 'dist/tmp',
  test: 'test',
  external: 'external',
  devDist: 'dist/dev',
  prodDist: 'dist/prod'
};

// All external dependencies which will not be loaded by SystemJS
// since they are not directly referenced in any app source.
var externalDependencies = [
  'node_modules/es6-shim/es6-shim.min.js',
  'node_modules/zone.js/dist/zone.js',
  'node_modules/reflect-metadata/Reflect.js',
  'node_modules/dress-code/dist/**/*'
];

/* --- Production Build --- */

gulp.task('clean:prod', function (done) {
  del([PATHS.prodDist], done);
});

gulp.task('build:ts:prod', function () {
  return buildTypescript([PATHS.src, '!' + PATHS.tests, '!' + PATHS.e2eTests], PATHS.tmp);
});

gulp.task('build:html:prod', function(){
  return gulp.src([PATHS.index])
    .pipe(gulp.dest(PATHS.prodDist));
});

gulp.task('build:external:prod', function () {
  return gulp.src(externalDependencies)
    .pipe(gulp.dest(path.join(PATHS.prodDist, PATHS.external)));
});

gulp.task('build:bundle:prod', function (done) {

    var builder = new Builder('', 'systemjs.config.js');
    builder.buildStatic('app', path.join(PATHS.prodDist, PATHS.bundleFile), {
      minify: true,
      mangle: true,
      sourceMaps: false,
      runtime: false
    }).then(function(){
      done();
    });
});

/* --- Development Build --- */

gulp.task('clean:dev', function (done) {
  del([PATHS.devDist], done);
});

gulp.task('build:ts:dev', function () {
  return buildTypescript([PATHS.src, '!' + PATHS.tests, '!' + PATHS.e2eTests], PATHS.tmp);
});

gulp.task('build:html:dev', function(){
  return gulp.src([PATHS.index])
    .pipe(gulp.dest(PATHS.devDist));
});

gulp.task('build:external:dev', function () {
  return gulp.src(externalDependencies)
    .pipe(gulp.dest(path.join(PATHS.devDist , PATHS.external)));
});

gulp.task('build:bundle:dev', function (done) {

    var builder = new Builder('', 'systemjs.config.js');
    builder.buildStatic('app', path.join(PATHS.devDist, PATHS.bundleFile), {
      minify: false,
      mangle: false,
      sourceMaps: false
    }).then(function(){
      done();
    });
});

gulp.task('watch:dev', ['build:dev'], function () {
  browserSync.reload({
    stream: false
  });
});

gulp.task('serve:dev', ['build:dev'], function () {
  browserSync.init({
    server: {
      baseDir: "./dist/dev",
      index: "index.html"
    }
  });

  gulp.watch([PATHS.src, PATHS.index, PATHS.css], ['watch:dev']);
});

/* --- Test Build --- */

gulp.task('karma', function (done) {
  new (karma).Server({
    configFile: path.join(process.cwd(), 'karma.conf.js')
  }).start(done);
});

gulp.task('clean:test', function (done) {
  del([PATHS.test], done);
});

gulp.task('build:ts:test', function () {
  return buildTypescript(PATHS.src, PATHS.test);
});

/* --- Misc tasks --- */

gulp.task('clean:tmp', function (done) {
  del([PATHS.tmp], done);
});

gulp.task('lint', function () {
  gulp.src(PATHS.src)
    .pipe(tslint())
    .pipe(tslint.report("verbose", {
      emitError: false
    }));
});

function buildTypescript(src, destination) {

  // HTML templates and CSS files of components will be inlined
  const INLINE_OPTIONS = {
    base: destination,
    useRelativePaths: true,
    removeLineBreaks: true
  };

  // Has to be loaded here, otherwise gulp-typescript will throw
  // error on consecutive builds in some strange situations.
  // See https://github.com/ivogabe/gulp-typescript/issues/307#issuecomment-226190638
  var tsProject = typescript.createProject(PATHS.tsconfig);

  return gulp
    .src(src)
    .pipe(inlineNg2Template(INLINE_OPTIONS))
    .pipe(typescript(tsProject))
    .pipe(gulp.dest(destination));
}

gulp.task('build:dev', function(done) {

  sequence(['clean:tmp',
            'clean:dev'],
            'build:ts:dev',
            'build:html:dev',
            'build:external:dev',
            'build:bundle:dev',
            done);
});

gulp.task('build:prod', function(done) {

  sequence(['clean:tmp',
            'clean:prod'],
            'build:ts:prod',
            'build:html:prod',
            'build:external:prod',
            'build:bundle:prod',
            done);
});

gulp.task('test', function(done) {

  sequence('clean:test',
           'build:ts:test',
           'karma',
           done);
});
