var gulp  = require('gulp'),
    gutil = require('gulp-util'),    
    templateCache = require('gulp-angular-templatecache'),
    gulpImagemin = require('gulp-imagemin'),
    del = require('del'),
    sass = require('gulp-sass')
    ;

var paths = {	
	scss_files 		: './webapp/scss/*.scss',
	img_files 		: './webapp/img/*',
	template_files	: './webapp/template/**/*.html',

	output_folder 	: './public/',
	dest_img_folder	: './public/img',
	dest_js_folder	: './public/js/',
	dest_css_folder : './public/css/'
	
};

gulp.task('clean', function() {
    return del([paths.output_folder]);
});


gulp.task('default', ['clean'], function() {	
	gulp.start('cache_template', 'imagemin', 'sass');
});
 
gulp.task('cache_template', function () {
  return gulp.src(paths.template_files)
            .pipe(templateCache())
            .pipe(gulp.dest(paths.dest_js_folder));
});


gulp.task('imagemin', function() {
    return gulp.src(paths.img_files)
    .pipe(gulpImagemin({ progressive: true }))
    .pipe(gulp.dest(paths.dest_img_folder));
});

gulp.task('sass', function() {
    gulp.src(paths.scss_files)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.dest_css_folder));
});
/*
gulp.task('img', function() {
  return gulp.src(paths.img_files)
    .pipe(gulpImagemin({ progressive: true }))
    .pipe(gulp.dest(paths.dest_img_folder));
});*/