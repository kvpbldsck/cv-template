const {
    calcWorkingPeriod,
    getPassedYears,
    capitalize,
    calcTotalWorkingPeriod
} = require('./utils');

module.exports = function(config) {
    config.addPassthroughCopy('src/css');
    config.addPassthroughCopy('src/fonts');
    config.addPassthroughCopy('src/scripts');
    config.addPassthroughCopy('src/styles');
    config.addPassthroughCopy('src/images');
    config.addPassthroughCopy('src/site.webmanifest');
    config.addPassthroughCopy('src/cv.pdf');

    config.addFilter('passedYears', getPassedYears);
    config.addFilter('workingPeriod', calcWorkingPeriod);
    config.addFilter('totalWorkingPeriod', calcTotalWorkingPeriod);
    config.addFilter('capitalize', capitalize);

    config.addTransform('htmlmin', (content, outputPath) => {
        if(outputPath && outputPath.endsWith('.html')) {
            const htmlmin = require('html-minifier');

            return htmlmin.minify(
                content,
                {
                    removeComments: true,
                    collapseWhitespace: true
                }
            );
        }
        return content;
    });

    config.addTransform('uglify-js', (content, outputPath) => {
        if(outputPath && outputPath.endsWith('.js')) {
            const uglify = require('uglify-js');

            return uglify.minify(content);
        }
        return content;
    });

    config.addPlugin(require("eleventy-plugin-svg-contents"));

    return {
        dir: {
            input: 'src',
            output: 'dist',
            includes: 'includes',
            layouts: 'layouts',
            data: "data"
        },
        dataTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        passthroughFileCopy: false,
        templateFormats: [
            'md', 'njk'
        ]
    };
};
