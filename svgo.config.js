module.exports = {
    multipass: true,
    plugins: [
        'removeComments',
        {
            name: 'preset-default',
            params: {
                overrides: {
                    removeViewBox: false
                }
            },
        },
    ],
};
