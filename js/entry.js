window.jQuery = window.$ = require('jquery');
require('bootstrap-sass/assets/javascripts/bootstrap.min');

require('font-awesome/css/font-awesome.min.css');

require('flexslider/flexslider.css');
require('flexslider/jquery.flexslider-min');

require('smoothscroll');
require('jquery-placeholder/jquery.placeholder');
require('gmap3/dist/gmap3.min');

$(document).ready(function () {

  var venueAddress = [40.6252233, 22.9495758];

  $('#map-canvas').gmap3({
    center: venueAddress,
    zoom: 16,
    streetViewControl: true,
    panControl: false,
    zoomControl: true,
    scrollwheel: false,
    mapTypeControl: false
  })
  .marker({
    position: venueAddress
  });

  var imageWidth, imageHeight, widthFix, heightFix, image = $('.header-background img');
  function centerImage() {
    imageWidth = image.width();
    imageHeight = image.height();
    widthFix = imageWidth / 2;
    heightFix = imageHeight / 2;
    image.css({'margin-left': -widthFix, 'margin-top': -heightFix});
  }

  $(window).on('load resize', centerImage);

  $(window).on('load', function () {
    $('#header-background').flexslider({
      useCSS: true,
      touch: true,
      animation: 'fade',
      start: function () {
        $('#preloader').addClass('ready');
        $('#header-background').removeClass('header-background-hide');
      }
    });
  });

  (function () {
    var nav = $('#navigation-wrap'),
      navOffset;

    function reCalc() {
      navOffset = nav.offset().top;
    };

    reCalc();
    $(window).resize(reCalc).scroll(function () {
      var winScroll = $(this).scrollTop();

      if (winScroll > navOffset) {
        nav.addClass('sticky');
      } else {
        nav.removeClass('sticky');
      }
    });
  })();

  $('input, textarea').placeholder();
});

// <script src="/js/jquery.nav.js"></script>
// <script src="/js/slack-invite.js"></script>
// <script src="/js/devit-custom.js"></script>
