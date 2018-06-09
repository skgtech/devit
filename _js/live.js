require('phonon/dist/js/phonon-core.js')

phonon.options({
  navigator: {
    defaultPage: 'schedule',
    animatePages: true,
    enableBrowserBackButton: true
  },
  i18n: null // for this example, we do not use internationalization
});


var app = phonon.navigator();

/**
 * The activity scope is not mandatory.
 * For the home page, we do not need to perform actions during
 * page events such as onCreate, onReady, etc
*/

// Let's go!
app.start();
