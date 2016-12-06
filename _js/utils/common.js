window.jQuery = window.$ = require('jquery');
require('bootstrap-sass/assets/javascripts/bootstrap.min');

require('font-awesome/css/font-awesome.min.css');

require('flexslider/flexslider.css');
require('flexslider/jquery.flexslider-min');

require('jquery-placeholder/jquery.placeholder');
require('./metrics');

var imageWidth;
var imageHeight;
var widthFix;
var heightFix;
var $image = $('.header-background img');

function centerImage() {
  imageWidth = $image.width();
  imageHeight = $image.height();
  widthFix = imageWidth / 2;
  heightFix = imageHeight / 2;
  $image.css({ 'margin-left': -widthFix, 'margin-top': -heightFix });
}

$(window).on('load resize', centerImage);

$(window).on('load', function () {
  var $headerBackground = $('#header-background');
  var $preloader = $('#preloader');

  $('#header-background').flexslider({
    useCSS: true,
    touch: true,
    animation: 'fade',
    start: function () {
      $preloader.addClass('ready');
      $headerBackground.removeClass('header-background-hide');
    },
  });
});

(function () {
  var $nav = $('#navigation-wrap');
  var navOffset;

  function reCalc() {
    navOffset = $nav.offset().top;
  }

  reCalc();
  $(window).resize(reCalc).scroll(function () {
    var winScroll = $(this).scrollTop();

    if (winScroll > navOffset) {
      $nav.addClass('sticky');
    } else {
      $nav.removeClass('sticky');
    }
  });
})();

$('input, textarea').placeholder();
