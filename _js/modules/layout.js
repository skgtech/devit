window.jQuery = window.$ = require('jquery');
require('bootstrap-sass/assets/javascripts/bootstrap/transition');
require('bootstrap-sass/assets/javascripts/bootstrap/collapse');
require('bootstrap-sass/assets/javascripts/bootstrap/tab');
require('lightslider/dist/js/lightslider.min');

var LazyLoad = require('vanilla-lazyload/dist/lazyload.min');

new LazyLoad({
  elements_selector: ".lazy"
});

require('./sticky-menu')('sticky');
require('./slack');
require('./venues');
