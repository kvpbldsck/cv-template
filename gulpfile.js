const babel = require('gulp-babel');
const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const uglify = require('gulp-uglify');

// Styles

gulp.task('styles:compress', () => {
    return gulp.src('src/web_page/styles/styles.css')
        .pipe(postcss([
            require('postcss-import'),
            // require('autoprefixer'),
            // require('cssnano')
        ]))
        .pipe(gulp.dest('dist/styles/styles.css'));
});

gulp.task('styles:inline', () => {
    return gulp.src('dist/**/*.html')
        .pipe(replace(
            /<link rel="stylesheet" href="\/styles\/styles.css">/, () => {
                const style = fs.readFileSync('dist/styles.css', 'utf8');
                return '<style>' + style + '</style>';
            }
        ))
        .pipe(gulp.dest('dist'));
});

// Scripts

gulp.task('scripts:compress', () => {
    return gulp.src('src/web_page/scripts/*.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/styles/:name.js'));
});

gulp.task('scripts:inline', () => {
    return gulp.src('dist/**/*.html')
        .pipe(replace(
            /<script src="\/scripts\/(.+?).js"><\/script>/,
            (match, p1) => {
                const style = fs.readFileSync(`dist/${p1}.js`, 'utf8');
                return `<script>${style}</script>`;
            }
        ))
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', () => {
    return del([
        // 'dist/styles',
        'dist/*.css',
        'dist/blocks',
        'dist/blocks/light.css',
        'dist/styles.css',
        'dist/scripts',
        'dist/scripts.js'
    ]);
});

// Build

gulp.task('build', gulp.series(
    'styles:compress',
    // 'styles:inline',
    // 'scripts:compress',
    // 'scripts:inline',
    // 'clean'
));
