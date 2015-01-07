(function($){
  "use strict";

  var url = "http://devitconf.org/";

  var devit = {

    init: function () {
      devit.getSocialCounts();
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
    }
  };

  $(document).ready(function () {
    devit.init();
  });

})(jQuery);
