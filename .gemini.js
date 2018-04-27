module.exports = {
    rootUrl: 'http://localhost:3000',
    gridUrl: "http://darya40:H45BXpFinyKAVfMfqawW@hub-cloud.browserstack.com/wd/hub",
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