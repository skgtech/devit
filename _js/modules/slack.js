/* global $ */

const X_API_KEY = "uLhcbhACxl86z5J3preLnckCOXhTSZ3hHUZeqxj0";
const SUBSCRIBE_URL =
  "https://wrywguckq5.execute-api.eu-west-1.amazonaws.com/prod/slack";

$(document).ready(function () {

  const slackFormEl = document.querySelector(".slack-form");
  const emailEl = slackFormEl.querySelector(".slack-field");
  const resultsEl = slackFormEl.querySelector(".slack-form__results");

  slackFormEl.addEventListener('submit', function (e){
    e.preventDefault();

    const emailValue = emailEl.value;

    if (!emailValue || !/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(emailValue)) {
      resultsEl.style.color = "red";
      resultsEl.innerHTML = "empty-email";
      return false;
    }

    $.ajax({
      method: "GET",
      url: SUBSCRIBE_URL,
      headers: {
        "x-api-key": X_API_KEY
      },
      data: {
        email: emailValue,
      }
    })
      .done(function(res) {
        if (res.error) {
          resultsEl.style.color = "red";
          if (res.error === "already_in_team") {
            resultsEl.innerHTML = "already_in_team";
          }

          if (res.error === "already_invited") {
            resultsEl.innerHTML = "already_invited";
          }
        } else {
          resultsEl.style.color = "lightgreen";
          resultsEl.innerHTML = "Thank you!";

          if (window.ga) {
            ga('send', 'event', 'Forms', 'Subscribe', 'Slack');
          }
        }
      })
      .fail(function() {
        resultsEl.style.color = "red";
        resultsEl.innerHTML = "Ooops. There is something wrong going on at the moment.";
      });
  })
});
