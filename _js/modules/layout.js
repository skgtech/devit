window.jQuery = window.$ = require('jquery');
require('bootstrap-sass/assets/javascripts/bootstrap/transition');
require('bootstrap-sass/assets/javascripts/bootstrap/collapse');
require('lightslider/dist/js/lightslider.min');

const stickyMenu = require('./sticky-menu');

stickyMenu('sticky');
