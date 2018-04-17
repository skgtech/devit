require('bootstrap-sass/assets/javascripts/bootstrap/tab');

var tabs = document.querySelectorAll('.schedule__tabs li:first-child');
var tabsContent = document.querySelectorAll('.schedule__content .tab-pane:first-child');

if (tabs.length) {
  tabs[0].classList.add('active');
}
if (tabsContent.length) {
  tabsContent[0].classList.add('active');
}

////////////////////////

var tabs = document.querySelectorAll('.workshops__tabs li:first-child');
var tabsContent = document.querySelectorAll('.workshops__content .tab-pane:first-child');

if (tabs.length) {
  tabs[0].classList.add('active');
}
if (tabsContent.length) {
  tabsContent[0].classList.add('active');
}

var hash = window.location.hash;
hash && $('ul.schedule__tabs a[href="' + hash + '"]').tab('show');

$('.schedule__tabs a').click(function (e) {
  $(this).tab('show');
  var scrollmem = $('body').scrollTop() || $('html').scrollTop();
  window.location.hash = this.hash;
  $('html,body').scrollTop(scrollmem);
});
