(function ($) {
  "use strict";

  $('.accordion, .right-col').height(window.innerHeight - 100);

  var feed = new Instafeed({
    clientId: '0bf9acacc332499f98c3c008221b2b9a',
    get: 'tagged',
    tagName: 'devitconf',
    limit: 30,
    links: false,
    resolution: 'standard_resolution',
    template: "<img src='{{image}}' class=\"col-xs-3\"/></a>"
  });

  var cb = new Codebird;
  cb.setConsumerKey("AyfxbZJjPsaRle1UK4qRxWw1l", "xe2MgxEGT2yx2ebvnxqNBFrdeArT6qt0TNQVXDX0XqxanunjPe");

  cb.setBearerToken("420403581-fhk7XPcXzhYTRRMS52D7B9dxlmYF666ANwLjJhAj");

  var params = {
    q: "#devitconf"
  };

  var QueryString = function () {
    // This function is anonymous, is executed immediately and
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      // If first entry with this name
      if (typeof query_string[pair[0]] === "undefined") {
        query_string[pair[0]] = pair[1];
        // If second entry with this name
      } else if (typeof query_string[pair[0]] === "string") {
        var arr = [query_string[pair[0]], pair[1]];
        query_string[pair[0]] = arr;
        // If third or later entry with this name
      } else {
        query_string[pair[0]].push(pair[1]);
      }
    }
    return query_string;
  }();

  if (QueryString.current) {
    var c = QueryString.current;
    var $el = $('.accordion li').eq(c);

    $el.addClass('active');
    $el.find('.schedule-time').text('NOW');
    $el.prevAll().addClass('past');
  }

  function updateInstagramFeed() {
    feed.run();
  }

  function updateTwitterFeed() {
    cb.__call(
      "search_tweets",
      params,
      function (reply) {

        var statuses = reply.statuses.slice(0, 4);

        $('.twitter-feed').html('');

        statuses.map(function (i) {
          $('.twitter-feed').append(
            $('<li/>')
              .append(
              $('<div/>')
                .addClass('twitter-feed-handle')
                .text('@' + i.user.screen_name)
            )
              .append(
              $('<div/>')
                .addClass('twitter-feed-body')
                .text(i.text)
            )
          );

        });

      }
    );
  }

  updateTwitterFeed();
  updateInstagramFeed();

  setInterval(
    function () {

      console.log('refreshing');

      updateTwitterFeed();
      updateInstagramFeed()

    }, 5000);

})(jQuery);
