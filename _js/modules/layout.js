window.jQuery = window.$ = require('jquery');
require('bootstrap-sass/assets/javascripts/bootstrap/transition');
require('bootstrap-sass/assets/javascripts/bootstrap/collapse');

$('.main-menu').on('click', '.main-menu__link', function () {
  $('.collapse').collapse('hide')
});

var LazyLoad = require('vanilla-lazyload/dist/lazyload.min');

new LazyLoad({
  elements_selector: ".lazy"
});

require('./sticky-menu')('sticky');
require('./slack');
require('./venues');
