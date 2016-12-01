require('./utils/common.js');

require.ensure(['gmap3/dist/gmap3.min', './utils/devit-custom.js'], function (require) {

  require('./utils/devit-custom.js');

  var venueAddress = [40.6252233, 22.9495758];

  require('gmap3/dist/gmap3.min');
  $('#map-canvas').gmap3({
    center: venueAddress,
    zoom: 16,
    streetViewControl: true,
    panControl: false,
    zoomControl: true,
    scrollwheel: false,
    mapTypeControl: false,
  })
  .marker({
    position: venueAddress,
  });
});
