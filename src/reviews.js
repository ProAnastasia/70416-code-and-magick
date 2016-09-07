'use strict';

(function() {
  var load = require('./load');
  var Review = require('./review');
  var utils = require('./utils');

  var REVIEWS_SOURCE = 'http://localhost:1506/api/reviews' + '?callback=' + '<' + 'JSONPCallback' + '>';

  var reviewsFilter = document.querySelector('.reviews-filter');
  var reviewsContainer = document.querySelector('.reviews-list');


  var getReviews = function(reviews) {
    reviews.forEach(function(review) {
      var newReview = new Review(review);
      reviewsContainer.appendChild(newReview.element);
    });
    utils.toggleVisibility(reviewsFilter, false);
  };
  utils.toggleVisibility(reviewsFilter, true);

  load(REVIEWS_SOURCE, getReviews);
})();
