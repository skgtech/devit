window.jQuery = window.$ = require('jquery');
require('bootstrap-sass/assets/javascripts/bootstrap.min');

require('font-awesome/css/font-awesome.min.css');

require('picturefill/dist/picturefill.min.js');

require('jquery-placeholder/jquery.placeholder');
require('./metrics');

var imageWidth;
var imageHeight;
var widthFix;
var heightFix;
var $image = $('.header-background img');

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
