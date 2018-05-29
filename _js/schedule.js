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

$('.schedule-item li :not([data-speaker-url=""]').hover(function (event) {
  var target = $(event.target);
  var url = target.data('speakerUrl');
  if(target.is('img') && url) {
    var currentSchduleElement = target.parents('.schedule-item').first();
    var speakerNameElement = currentSchduleElement.find('span[data-speaker-url="' + url + '"]').first();
    if(event.type == "mouseenter") {
      speakerNameElement.addClass("font-weight-bold");
    }
    else if(event.type == "mouseleave") {
      speakerNameElement.removeClass("font-weight-bold");
    }
  }
});