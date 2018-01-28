$(document).ready(function () {

  var formEl = document.querySelector('.subscribe-form');
  var resultEl = document.querySelector('.subscribe-result');

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
      type: 'GET',
      url: formEl.action,
      data: toJSONString(formEl),
      cache: false,
      dataType: 'jsonp',
      jsonp: 'c',
      contentType: 'application/json; charset=utf-8',
      success: function (data) {
        if (data.result != 'success') {
          var message = data.msg || 'Sorry. Unable to subscribe. Please try again later.';
          resultEl.style.color = 'red';
          if (data.msg && data.msg.indexOf('already subscribed') >= 0) {
            message = 'You\'re already subscribed. Thank you.';
          }
          resultEl.innerHTML = message;
        } else {
          resultEl.innerHTML = 'Thank you!<br>You must confirm the subscription in your inbox.';
        }
      }
    });
  }
});
