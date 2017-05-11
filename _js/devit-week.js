require('./utils/common.js');

require.ensure(['gmap3/dist/gmap3.min'], function (require) {



  var cohoAddress = [40.6211786, 22.95508];
  var cityHallAddress = [40.6233958, 22.9538091];

  require('gmap3/dist/gmap3.min');
  $('#map-day-2').gmap3({
    center: cohoAddress,
    zoom: 16,
    streetViewControl: true,
    panControl: false,
    zoomControl: true,
    scrollwheel: false,
    mapTypeControl: false,
  })
  .marker({
    position: cohoAddress,
  });

  $('#map-day-3').gmap3({
    center: cityHallAddress,
    zoom: 16,
    streetViewControl: true,
    panControl: false,
    zoomControl: true,
    scrollwheel: false,
    mapTypeControl: false,
  })
  .marker({
    position: cityHallAddress,
  });
});

