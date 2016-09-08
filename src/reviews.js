'use strict';

(function() {
  var load = require('./load');
  var Review = require('./review');
  var utils = require('./utils');
  var dataUrl = 'http://localhost:1506/api/reviews';

  var reviewsFilter = document.querySelector('.reviews-filter');
  var reviewsContainer = document.querySelector('.reviews-list');


  window.JSONPCallback = function(reviews) {
    reviews.forEach(function(review) {
      var newReview = new Review(review);
      reviewsContainer.appendChild(newReview.element);
    });
    utils.toggleVisibility(reviewsFilter, false);
  };
  utils.toggleVisibility(reviewsFilter, true);

  load(dataUrl, 'JSONPCallback');
})();
