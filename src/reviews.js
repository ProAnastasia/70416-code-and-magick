'use strict';

(function() {

  var REVIEWS_SOURCE = 'http://localhost:1506/api/reviews';
  var HIDDEN = 'invisible';
  var IMAGE_LOAD_TIMEOUT = 10000;

  var reviews = [];
  var reviewsFilter = document.querySelector('.reviews-filter');
  var reviewsContainer = document.querySelector('.reviews-list');
  var reviewTemplate = document.querySelector('template');
  var elementToClone;


  if ('content' in reviewTemplate) {
    elementToClone = reviewTemplate.content.querySelector('.review');
  } else {
    elementToClone = reviewTemplate.querySelector('.review');
  }

  appendScript(REVIEWS_SOURCE, 'loadReviewsCallback');
  toggleVisibility(reviewsFilter, true);

  window.loadReviewsCallback = function(responseData) {
    reviews = responseData;
    reviews.forEach(function(review) {
      getReviewItem(review, reviewsContainer);
    });
    toggleVisibility(reviewsFilter, false);
  };

  function getReviewItem(data, container) {
    var element = elementToClone.cloneNode(true);
    var authorImage = new Image();
    var imageElement = element.querySelector('img');
    var imageLoadTimeout = null;

    authorImage.onload = function(evt) {
      clearTimeout(imageLoadTimeout);
      imageElement.width = '124';
      imageElement.height = '124';
      imageElement.src = evt.target.src;
    };

    authorImage.onerror = function() {
      element.classList.add('review-load-failure');
    };

    authorImage.src = data.author.picture;

    element.querySelector('.review-text').textContent = data.description;
    container.appendChild(element);

    imageLoadTimeout = setTimeout(function() {
      element.classList.add('hotel-nophoto');
    }, IMAGE_LOAD_TIMEOUT);

    return element;
  }

  function toggleVisibility(elem, state) {
    elem.classList.toggle(HIDDEN, state);
  }

  function appendScript(url, cb) {
    var script = document.createElement('script');

    script.src = url + '?callback=' + cb;
    document.body.appendChild(script);
  }
})();
