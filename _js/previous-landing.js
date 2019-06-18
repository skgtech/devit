require('bootstrap-sass/assets/javascripts/bootstrap/modal');

$('#video-modal').on('shown.bs.modal', function () {
  $('.moments-video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
})
$('#video-modal').on('hidden.bs.modal', function () {
  $('.moments-video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
})
