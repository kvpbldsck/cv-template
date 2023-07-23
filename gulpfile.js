const { src, dest, series } = require('gulp')
const postcss = require("gulp-postcss");
const replace = require("gulp-replace");
const fs = require("fs");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const del = require("del");

function compressStyles() {
    return src('dist/styles/**/*.css')
        .pipe(postcss([
            require('postcss-import'),
            require('autoprefixer'),
            require('cssnano')
        ]))
        .pipe(dest('dist/styles/'));
}

function inlineStyles() {
    return src('dist/**/*.html')
        .pipe(replace(
            /<link rel="stylesheet" href="([^"]+)"([^>]*)>/g,
            (match, fileName, restAttributes) => {
                const styles = fs.readFileSync(`dist${fileName}`);
                return restAttributes
                    ? `<style${restAttributes}>${styles}</style>`
                    : `<style>${styles}</style>`;
            }
        ))
        .pipe(dest('dist'));
}

function compressScripts() {
    return src('dist/scripts/**/*.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(dest('dist/scripts/'));
}

function inlineScripts() {
    return src('dist/**/*.html')
        .pipe(replace(
            /<script src="([^"]+)"><\/script>/g,
            (match, fileName) => {
                const script = fs.readFileSync(`dist${fileName}`);
                return `<script>${script}</script>`;
            }
        ))
        .pipe(dest('dist'));
}

function clean() {
    return del([
        'dist/styles',
        'dist/scripts',
    ])
}

const styles = series(compressStyles, inlineStyles)
const scripts = series(compressScripts, inlineScripts)
const pack = series(styles, scripts, clean)

exports.default = pack;
