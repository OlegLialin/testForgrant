var gulp          = require('gulp'), // include Gulp
    sass          = require('gulp-sass'), //include Sass package,
    browserSync   = require('browser-sync'), // include Browser Syn
    sourcemaps    = require('gulp-sourcemaps'), //maps
    concat        = require('gulp-concat'), // Connect gulp-concat (for concatenate files)
    uglify        = require('gulp-uglifyjs'), // Connect gulp-uglifyjs (for compression JS)
    autoprefixer  = require('gulp-autoprefixer'),// Connect library for automatic addition of prefixes
    del           = require('del'), // Connect library for delete files and folders
    imagemin      = require('gulp-imagemin'), // Connect library for work with images
    pngquant      = require('imagemin-pngquant'), // Connect library for work with png
    cache         = require('gulp-cache'), // Connect caching library
    cssmin        = require('gulp-cssmin'), // Minification css
    rename        = require('gulp-rename'), // Automatic addition of postfix like (.min)
    inject        = require('gulp-inject'), //takes a stream of source files, transforms each file to a string and injects each transformed string into placeholders in the target stream files
    es            = require('event-stream'); // Injecting files from multiple source streams

gulp.task('sass', function () {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Create prefixes
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true})); // Updating CSS on the page when changing

});

gulp.task('browser-sync', function() { // Create a browser-sync task
  browserSync({ // Running browser Sync
    server: { // Define server parameters
      baseDir: 'app' // Server Directory - app
    },
    notify: false // Disable notifications
  });
});

gulp.task('scripts', function() {
  return gulp.src([ // We take all necessary libraries (for concatenation of files)
    'app/bower/jquery/dist/jquery.min.js',
    'app/bower/popper.js/dist/umd/popper.min.js',
    'app/bower/bootstrap/dist/js/bootstrap.min.js',
    'app/bower/bootstrap-select/dist/js/bootstrap-select.min.js'// Take jQuery
    // We can take another library
  ])
    .pipe(concat('libs.min.js')) // We collect them in a heap in a new file libs.min.js
    .pipe(uglify()) // Compress the JS file
    .pipe(gulp.dest('app/js')); // We unload into the app/js
});

gulp.task('watch', ['browser-sync', 'sass', 'scripts'], function() {
  gulp.watch('app/scss/**/*.scss', ['sass']); // Monitoring scss files
  gulp.watch('app/*.html', browserSync.reload); // Monitoring of HTML files at the root of the project
  gulp.watch('app/js/**/*.js', browserSync.reload); // Monitoring JS files in a folder

});

gulp.task('clean', function() {
  return del.sync('build'); // Delete the build folder before assembly
});

gulp.task('img', function() {
  return gulp.src('app/images/**/*') // We take all the images from the app
    .pipe(cache(imagemin({  // We compress them with the best settings considering caching
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    })))
    .pipe(gulp.dest('build/images')); // Unloaded on production
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {

  var buildHtml = gulp.src('app/*.html') // Transfer HTML to Production
    .pipe(gulp.dest('build'));

  var streamScriptsLibs = gulp.src([ // We take all necessary libraries (for concatenation of files)
    'app/js/libs.min.js'
    // We can take another library
  ])
    .pipe(concat('libs.min.js')) // We collect them in a heap in a new file libs.min.js
    .pipe(uglify()) // Compress the JS file
    .pipe(gulp.dest('build/js')); // Unload into the build/js

  var streamScriptsMain = gulp.src([ // We take all necessary libraries (for concatenation of files)
    'app/js/main.js'
    // We can take another library
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify()) // Compress the JS file
    .pipe(gulp.dest('build/js')); // Unload into the build/js

  var streamCss = gulp.src('app/css/**/*.css')
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/css'));

  gulp.src('app/index.html')
    .pipe(inject(es.merge(  streamScriptsLibs), {relative: true, name: 'head'})) // Define this js file first from the top
    .pipe(inject(es.merge(  streamCss, streamScriptsMain), {relative: true}))
    .pipe(gulp.dest('build'));

  gulp.task('index', function () {
    gulp.src('app/index.html')
      .pipe(gulp.dest('./build'));
  });
});



gulp.task('default', ['watch']); // Not to write in the console constantly gulp watch, and write just gulp

gulp.task('clear', function () {
  return cache.clearAll(); // Cleaning the cache Gulp (If there are problems with the files being cached, just clean the cache)
});
