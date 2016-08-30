'use strict';

(function() {
  var load = require('./load');
  var review = require('./review');
  var utils = require('./utils');

  var REVIEWS_SOURCE = 'http://localhost:1506/api/reviews';

  var reviewsFilter = document.querySelector('.reviews-filter');
  var reviewsContainer = document.querySelector('.reviews-list');

  window.loadReviewsCallback = function(responseData) {
    responseData.forEach(function(elem) {
      review(elem, reviewsContainer);
    });
    utils.toggleVisibility(reviewsFilter, false);
  };
  utils.toggleVisibility(reviewsFilter, true);

  load(REVIEWS_SOURCE, 'loadReviewsCallback');
})();
