/**
 * @fileOverview Metrics wrapper for Google Analytics and FB Pixel.
 */

var metrics = module.exports = {};

/**
 * Track a pixel event.
 *
 * @param {string} eventType Any string.
 */
metrics.pixelTrack = function(eventType) {
  if (typeof window.fbq !== 'function') {
    return;
  }

  window.fbq('track', eventType);
};
