(function ($) {
  'use strict';

  var Slack = require('./slack-invite.js');

  var url = 'http://devitconf.org/';

  var devit = {

    init: function () {
      devit.getSocialCounts();
      devit.setCurrentYear();
      devit.initSlack();
    },

    getSocialCounts: function () {
      $.getJSON(
        'http://public.newsharecounts.com/count.json?url=' + url + '&callback=?',
        function (json) {
          $('.js-tw-count').text(devit.siAbbrevCount(json.count));
        }
      );

      $.getJSON(
        'http://graph.facebook.com/' + url,
        function (json) {
          $('.js-fb-count').text(devit.siAbbrevCount(json.share.share_count));
        }
      );
    },

    siAbbrevCount: function (n) {
      var c = parseInt(n);

      if (c > 9999 && c <= 999999) {
        return parseFloat((c / 1000).toFixed(1)) + 'k';
      } else if (c > 999999) {
        return parseFloat((c / 1000000).toFixed(1)) + 'm';
      } else {
        return c;
      }
    },

    setCurrentYear: function () {
      var currentYear = new Date().getFullYear();
      $('.js-current-year').text(currentYear);
    },

    initSlack: function () {
        var slackApp = new Slack();
        slackApp.init({
          emailContainer: '.slack-subscribe-email',
          cta: '.slack-subscribe-button',
          form: '.slack-form',
        });
      },
  };

  devit.init();
  $('#coc-full-toggle').on('click', function () {
    $('#coc-full').slideToggle();
    return false;
  });

  $(window).on('hashchange', function () {
    switch (window.location.hash) {
      case '#endor':
      case '#caprica':
      case '#workshops':
        $('a[href="' + window.location.hash + '"]').trigger('click');
        document.getElementById('sessions').scrollIntoView(true);
      break;
    }
  });

  $(window).trigger('hashchange');

  var newsletter = {};
  newsletter.mceInit = function () {
    var options = {
      url: 'http://check-connectivity.us2.list-manage.com/subscribe/post-json?u=249dbe460c3c1857a489dde05&amp;id=faa2000c02&c=?',
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
    };

    $('.mc-embed-signup form').submit(function (ev) {
      $('.response').hide();
      ev.preventDefault();

      // form position
      var email = this.EMAIL.value;
      options.data = $(this).serialize();
      options.success = function (resp) {
        newsletter.mceSuccess(resp, email);
      };

      $.ajax(options);

      return false;
    });
  };

  newsletter.mceSuccess = function (resp) {
    if (resp.result === 'success') {
      $('.mc-embed-signup').hide();
      $('.thankyou').removeClass('hide');
      ga('send', 'pageview', {
        page: '/signup-frontpage',
        title: 'User Signup',
      });
      return;
    }

    var index = -1;
    var msg;
    try {
      var parts = resp.msg.split(' - ', 2);
      if (parts[1] === undefined) {
        msg = resp.msg;
      } else {
        var i = parseInt(parts[0], 10);
        if (i.toString() === parts[0]) {
          index = parts[0];
          msg = parts[1];
        } else {
          index = -1;
          msg = resp.msg;
        }
      }
    } catch (e) {
      index = -1;
      msg = resp.msg;
    }

    $('.js-error').show();
    $('.js-error').html(msg);
  };

  newsletter.mceInit();

  $('.after-party-venue').on('click', function () {
    window.location.href = $(this).data('href');
  });

})(jQuery);
