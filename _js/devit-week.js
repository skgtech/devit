require('./utils/common.js');

require.ensure(['gmap3/dist/gmap3.min'], function (require) {

  require('gmap3/dist/gmap3.min');

  function initMap(id, location) {
    $(id)
      .gmap3({
        center: location,
        zoom: 16,
        streetViewControl: true,
        panControl: false,
        zoomControl: true,
        scrollwheel: false,
        mapTypeControl: false,
      })
      .marker({
        position: location,
      });
  }

  var cohoAddress = [40.6211786, 22.95508];
  var cityHallAddress = [40.6233958, 22.9538091];

  var mapInitState = {
    '#tuesday-map': { init: false, location: cohoAddress },
    '#wednesday-map': { init: false, location: cityHallAddress }
  };

  $(document).ready(function () {

    $('ul.nav-tabs').on('click', "a[data-toggle='tab']", function (e) {
      var mapId = $(e.target).attr('href') + '-map';

      if (mapInitState[mapId] && !mapInitState[mapId].init) {
        mapInitState[mapId].init = true;

        // gmap3 dont render map if the div is not vissible
        // add some delay until tab change
        // ¯\_(ツ)_/¯
        setTimeout(function () {
          initMap(mapId, mapInitState[mapId].location);
        }, 1000);
      }
    });

    $('ul.nav-tabs li.active a').trigger('click');

  });

});
