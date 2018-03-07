/* global $ */

require('gmap3/dist/gmap3.min');

$.gmap3({
  key: 'AIzaSyDjgQclS742xka5sFuxysSIwsdiqYpxRhk'
});

$(document).ready(function () {

  const mapElements = document.querySelectorAll(".venue__map");

  mapElements.forEach(function (element) {
    $(element).gmap3({
      center: [element.dataset.long, element.dataset.lat],
      zoom: 16,
      streetViewControl: true,
      panControl: false,
      zoomControl: true,
      scrollwheel: false,
      mapTypeControl: false,
    })
    .marker({
      position: [element.dataset.long, element.dataset.lat],
    });
  });

});
