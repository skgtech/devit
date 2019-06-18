require('bootstrap-sass/assets/javascripts/bootstrap/modal');

// auto stop video when modal closes
$('#video-modal').on('hidden.bs.modal', function () {
  $('.moments-video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
})
