'use strict';

var LOAD_REVIEWS_URL = '/api/reviews';

(function() {
  var load = require('./load');
  var Review = require('./review');
  var utils = require('./utils');

  var reviewsFilter = document.querySelector('.reviews-filter');
  var reviewsContainer = document.querySelector('.reviews-list');
  var moreReviews = document.querySelector('.reviews-controls-more');

  var PAGE_SIZE = 3;
  var pageNumber = 0;

  utils.toggleVisibility(reviewsFilter, true);

  moreReviews.addEventListener('click', function() {
    loadMoreReviews(pageNumber++);
  });

  reviewsFilter.addEventListener('change', function(evt) {
    if ((evt.target.type === 'radio')) {
      pageNumber = 0;
      reviewsContainer.innerHTML = '';
      loadMoreReviews(pageNumber++);
    }
  }, true);

  function loadData(reviews) {
    if (reviews) {
      var fragment = document.createDocumentFragment();

      utils.toggleVisibility(reviewsFilter, false);
      reviews.forEach(function(review) {
        fragment.appendChild(new Review(review).element);
      });
      reviewsContainer.appendChild(fragment);
      utils.toggleVisibility(moreReviews, false);
    } else {
      utils.toggleVisibility(moreReviews, true);
    }
  }

  function loadMoreReviews(currentPage) {
    var from = currentPage * PAGE_SIZE;
    var to = from + PAGE_SIZE;
    var filter = document.querySelector('input[name="reviews"]:checked').id;

    load(LOAD_REVIEWS_URL, {
      from: from,
      to: to,
      filter: filter
    }, loadData);
  }

  loadMoreReviews(pageNumber++);
})();
