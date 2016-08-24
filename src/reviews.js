'use strict';

var reviews = [];
var REVIEWS_SOURCE = 'http://localhost:1506/api/reviews';

window.loadReviewsCallback = function(responseData) {
  reviews = responseData;
};

function appendScript(url, cb) {
  var script = document.createElement('script');

  script.src = url + '?callback=' + cb;
  document.body.appendChild(script);
}

appendScript(REVIEWS_SOURCE, 'loadReviewsCallback');
