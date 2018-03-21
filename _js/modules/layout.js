window.jQuery = window.$ = require('jquery');
require('bootstrap-sass/assets/javascripts/bootstrap/transition');
require('bootstrap-sass/assets/javascripts/bootstrap/collapse');
require('bootstrap-sass/assets/javascripts/bootstrap/tab');

var tabs = document.querySelectorAll('.talks__tabs ul li:first-child');
var tabsContent = document.querySelectorAll('.talks__content .tab-pane:first-child');
if (tabs.length) {
  tabs[0].classList.add('active');
}
if (tabsContent.length) {
  tabsContent[0].classList.add('active');
}

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
