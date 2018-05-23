require('bootstrap-sass/assets/javascripts/bootstrap/tab');

var tabs = document.querySelectorAll('.talks__tabs ul li:first-child');
var tabsContent = document.querySelectorAll('.talks__content .tab-pane:first-child');
if (tabs.length) {
  tabs[0].classList.add('active');
}
if (tabsContent.length) {
  tabsContent[0].classList.add('active');
}

var hash = window.location.hash;
if (hash !== "" && hash != null) {
  $(document).ready(function() {
    $('body').scrollTop($("div.talks").offset().top);
  });
  $('ul.nav a[href="' + hash + '"]').tab('show');
}

$('.nav-tabs a').click(function (e) {
  $(this).tab('show');
  var scrollmem = $('body').scrollTop() || $('html').scrollTop();
  window.location.hash = this.hash;
  $('html,body').scrollTop(scrollmem);
});
