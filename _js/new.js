window.jQuery = window.$ = require('jquery');

require('lightslider/dist/js/lightslider.min');

$(document).ready(function () {
  $('#autoWidth').lightSlider({
    // autoWidth: true,
    controls: true,
    pager: true,
    item: 3,
    adaptiveHeight: true,
    loop: true,
    onSliderLoad: function () {
      // $('#autoWidth').removeClass('cS-hidden');
      $.getScript('https://platform.twitter.com/widgets.js', function () {
        console.log('twitter loaded');
      })
    }
  });
});
