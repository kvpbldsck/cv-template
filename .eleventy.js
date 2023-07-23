const {
    calcWorkingPeriod,
    getPassedYears,
    capitalize,
    calcTotalWorkingPeriod
} = require('./utils');

module.exports = function(config) {
    config.addPassthroughCopy('src/web_page/css');
    config.addPassthroughCopy('src/web_page/fonts');
    config.addPassthroughCopy('src/web_page/scripts');
    config.addPassthroughCopy('src/web_page/styles');
    config.addPassthroughCopy('src/web_page/images');
    config.addPassthroughCopy('src/web_page/site.webmanifest');
    config.addPassthroughCopy('src/web_page/cv.pdf');

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
            input: 'src/web_page',
            output: 'dist',
            includes: 'includes',
            layouts: 'layouts',
            data: "../data"
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
