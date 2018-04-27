gemini.suite('gallery_desktop_s', (suite) => {
    suite
        .before(function (actions, find) {
            actions.setWindowSize(960, 640);
        })
        .setUrl('/')
        .setCaptureElements('.gallery')
        .capture('desktop_s', function(actions) {
            actions.waitForElementToHide('.spinner', 30000);
        });
});
gemini.suite('gallery_desktop_m', (suite) => {
    suite.setUrl('/')
        .before(function (actions, find) {
            actions.setWindowSize(1280,1024);
        })
        .setCaptureElements('.gallery')
        .capture('desktop_m', function(actions) {
            actions.waitForElementToHide('.spinner', 30000);
        });
});
gemini.suite('gallery_desktop_l', (suite) => {
    suite.setUrl('/')
        .before(function (actions, find) {
            actions.setWindowSize(1920,1440);
        })
        .setCaptureElements('.gallery')
        .capture('desktop_l', function(actions) {
            actions.waitForElementToHide('.spinner', 30000);
        });
});
gemini.suite('gallery_mobile_port', (suite) => {
    suite.setUrl('/')
        .before(function (actions, find) {
            actions.setWindowSize(375,667);
        })
        .setCaptureElements('.gallery')
        .capture('mobile_port', function(actions) {
            actions.waitForElementToHide('.spinner', 30000);
        });
});
gemini.suite('gallery_mobile_land', (suite) => {
    suite.setUrl('/')
        .before(function (actions, find) {
            actions.setWindowSize(667,375);
        })
        .setCaptureElements('.gallery')
        .capture('mobile_land', function(actions) {
            actions.waitForElementToHide('.spinner', 30000);
        });
});
gemini.suite('gallery_preview_desktop', (suite) => {
    suite.setUrl('/')
        .before(function (actions, find) {
            actions
                .waitForElementToHide('.spinner', 30000);
                this.image = find('.gallery__item');
        })
        .setCaptureElements('.GalleryImagePreview__overlay')
        .capture('gallery_preview_desktop', function(actions, find) {
            actions.click(this.image);
            actions.waitForElementToShow('.GalleryImagePreview', 3000);
        });
});

gemini.suite('gallery_preview_mobile_port', (suite) => {
    suite.setUrl('/')
        .before(function (actions, find) {

            actions.setWindowSize(375,667);
            actions.waitForElementToHide('.spinner', 30000);
            this.image = find('.gallery__item');
        })
        .setCaptureElements('.GalleryImagePreview__overlay')
        .capture('gallery_preview_mobile_port', function(actions, find) {
            actions.click(this.image);
            actions.waitForElementToShow('.GalleryImagePreview', 3000);
        });
});
gemini.suite('gallery_preview_mobile_land', (suite) => {
    suite.setUrl('/')
        .before(function (actions, find) {

            actions.setWindowSize(667,375);
            actions.waitForElementToHide('.spinner', 30000);
            this.image = find('.gallery__item');
        })
        .setCaptureElements('.GalleryImagePreview__overlay')
        .capture('gallery_preview_mobile_land', function(actions, find) {
            actions.click(this.image);
            actions.waitForElementToShow('.GalleryImagePreview', 3000);
        });
});