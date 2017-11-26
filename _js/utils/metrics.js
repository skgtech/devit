/**
 * @fileOverview Metrics wrapper for Google Analytics and FB Pixel.
 */

var metrics = module.exports = {};

/**
 * Track a pixel event.
 *
 * @param {string} eventType Any string.
 */
metrics.pixelTrack = function (eventType) {
  if (typeof window.fbq !== 'function') {
    return;
  }

  window.fbq('track', eventType);
};

/**
 * Attach the Buy Tickets CTA track
 *
 */
metrics.attachBuyTicketsTrack = function () {
  var buyEl = document.getElementById('register-cta');
  if (buyEl) {
    buyEl.addEventListener('click', function () {
      if (typeof window.fbq !== 'function') {
        return;
      }

      window.fbq('track', 'Lead', { location: 'topnav', type: 'buy-tickets' });
    });
  }
};

metrics.attachBuyTicketsTrack();
