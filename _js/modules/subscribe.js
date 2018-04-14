/* global $ */

$(document).ready(function () {

  var formEl = document.querySelector('.subscribe-form');
  var resultEl = document.querySelector('.subscribe-result');

  if (!formEl) {
    return;
  }

  formEl.addEventListener('submit', function (e) {
    e.preventDefault();
    resultEl.classList.remove('hidden');

    if (!isValidEmail(formEl)) {
      var error = 'A valid email address must be provided.';
      resultEl.innerHTML = error;
      resultEl.style.color = 'red';
    } else {
      resultEl.innerHTML = 'Subscribing...';
      submitSubscribeForm(formEl, resultEl);
    }
  });

  function isValidEmail(formEl) {
    var email = formEl.querySelector('input[type=\'email\']').value;
    if (!email || !email.length) {
      return false;
    } else if (email.indexOf('@') == -1) {
      return false;
    }
    return true;
  }

  function toJSONString(form) {
    var obj = {};
    var elements = form.querySelectorAll("input, select, textarea");
    for (var i = 0; i < elements.length; ++i) {
      var element = elements[i];
      var name = element.name;
      var value = element.value;

      if (name) {
        obj[name] = value;
      }
    }

    return JSON.stringify(obj);
  }

  function submitSubscribeForm(formEl, resultEl) {
    $.ajax({
      url: 'https://check-connectivity.us2.list-manage.com/subscribe/post-json?u=249dbe460c3c1857a489dde05&amp;id=faa2000c02&c=?',
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      cache: false,
      data: $(formEl).serialize(),
      success: function (data) {
        if (data.result != 'success') {
          var message = data.msg || 'Sorry. Unable to subscribe. Please try again later.';
          resultEl.style.color = 'red';
          if (data.msg && data.msg.indexOf('already subscribed') >= 0) {
            message = 'You\'re already subscribed. Thank you.';
          }
          resultEl.innerHTML = message;
        } else {
          if (window.ga) {
            ga('send', 'event', 'Forms', 'Subscribe', 'Newsletter');
          }
          resultEl.innerHTML = 'Thank you!<br>You must confirm the subscription in your inbox.';
        }
      }
    });
  }
});
