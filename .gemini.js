module.exports = {
    rootUrl: 'http://localhost:3000',
    gridUrl: 'http://127.0.0.1:4444/wd/hub',
    compositeImage: true,
    retry: 10,

    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        },
    },

    system: {
        parallelLimit: 1,
        plugins: {
            'html-reporter/gemini': {
                enabled: true,
                path: 'gemini-reports',
                defaultView: 'all',
            }
        },
    }
};