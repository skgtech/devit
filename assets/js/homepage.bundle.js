webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);

	__webpack_require__.e/* nsure */(1, function (require) {

	  __webpack_require__(25);

	  var venueAddress = [40.6252233, 22.9495758];

	  __webpack_require__(24);
	  $('#map-canvas').gmap3({
	    center: venueAddress,
	    zoom: 16,
	    streetViewControl: true,
	    panControl: false,
	    zoomControl: true,
	    scrollwheel: false,
	    mapTypeControl: false,
	  })
	  .marker({
	    position: venueAddress,
	  });
	});


/***/ }
]);