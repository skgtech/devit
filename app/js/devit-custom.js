(function($){
  "use strict";

  var url = "http://devitconf.org/";

  var devit = {

    init: function () {
      devit.getSocialCounts();
      devit.setCurrentYear();
    },

    getSocialCounts: function () {
      $.getJSON(
        "http://urls.api.twitter.com/1/urls/count.json?url=" + url + "&callback=?",
        function (json) {
          $('.js-tw-count').text(devit._getK(json.count));
        }
      );

      $.getJSON(
        "http://graph.facebook.com/" + url,
        function (json) {
          $('.js-fb-count').text(devit._getK(json.shares));
        }
      );
    },

    _getK: function(n) {
      var c = parseInt(n);

      if(c > 1000)
        return ('' + c)[0] + 'k';
      else
        return c;
    },

    setCurrentYear: function () {
      var currentYear = new Date().getFullYear();
      $('.js-current-year').text(currentYear);
    }
  };

  $(document).ready(function () {
    devit.init();
  });

})(jQuery);
