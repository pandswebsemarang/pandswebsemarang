'use strict';

let gulp            = require('gulp'),
	rename          = require('gulp-rename'),
	notify          = require('gulp-notify'),
	autoprefixer    = require('gulp-autoprefixer'),
	sass            = require('gulp-sass'),
	plumber         = require('gulp-plumber'),
	checktextdomain = require('gulp-checktextdomain');

//frontend
gulp.task('madx-blog', () => {
	return gulp.src('./assets/scss/madx-blog.scss')
		.pipe(
			plumber( {
				errorHandler: function ( error ) {
					console.log('=================ERROR=================');
					console.log(error.message);
					this.emit( 'end' );
				}
			})
		)
		.pipe(sass( { outputStyle: 'compressed' } ))
		.pipe(autoprefixer({
				browsers: ['last 10 versions'],
				cascade: false
		}))

		.pipe(rename('madx-blog.css'))
		.pipe(gulp.dest('./assets/css/'))
		.pipe(notify('Compile Sass Done!'));
});

gulp.task('madx-blog-editor', () => {
	return gulp.src('./assets/scss/editor.scss')
		.pipe(
			plumber( {
				errorHandler: function ( error ) {
					console.log('=================ERROR=================');
					console.log(error.message);
					this.emit( 'end' );
				}
			})
		)
		.pipe(sass( { outputStyle: 'compressed' } ))
		.pipe(autoprefixer({
			browsers: ['last 10 versions'],
			cascade: false
		}))

		.pipe(rename('editor.css'))
		.pipe(gulp.dest('./assets/css/'))
		.pipe(notify('Compile Sass Done!'));
});

gulp.task('madx-blog-rtl', () => {
	return gulp.src('./assets/scss/madx-blog-rtl.scss')
		.pipe(
			plumber( {
				errorHandler: function ( error ) {
					console.log('=================ERROR=================');
					console.log(error.message);
					this.emit( 'end' );
				}
			})
		)
		.pipe(sass( { outputStyle: 'compressed' } ))
		.pipe(autoprefixer({
			browsers: ['last 10 versions'],
			cascade: false
		}))

		.pipe(rename('madx-blog-rtl.css'))
		.pipe(gulp.dest('./assets/css/'))
		.pipe(notify('Compile Sass Done!'));
});


//watch
gulp.task('watch', () => {
	gulp.watch('./assets/scss/**', ['madx-blog', 'madx-blog-editor', 'madx-blog-rtl']);
});

gulp.task( 'checktextdomain', () => {
	return gulp.src( ['**/*.php', '!cherry-framework/**/*.php'] )
		.pipe( checktextdomain( {
			text_domain: 'madx-blog',
			keywords:    [
				'__:1,2d',
				'_e:1,2d',
				'_x:1,2c,3d',
				'esc_html__:1,2d',
				'esc_html_e:1,2d',
				'esc_html_x:1,2c,3d',
				'esc_attr__:1,2d',
				'esc_attr_e:1,2d',
				'esc_attr_x:1,2c,3d',
				'_ex:1,2c,3d',
				'_n:1,2,4d',
				'_nx:1,2,4c,5d',
				'_n_noop:1,2,3d',
				'_nx_noop:1,2,3c,4d',
				'translate_nooped_plural:1,2c,3d'
			]
		} ) );
} );
