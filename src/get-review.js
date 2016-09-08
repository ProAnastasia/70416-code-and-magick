'use strict';

module.exports = function(data) {
  var reviewTemplate = document.querySelector('template');
  var elementToClone = (reviewTemplate.content || reviewTemplate).querySelector('.review');
  var element = elementToClone.cloneNode(true);
  var elementRating = element.querySelector('.review-rating');
  var elementText = element.querySelector('.review-text');
  var elementAuthor = element.querySelector('.review-author');

  var IMAGE_LOAD_TIMER = 10000;
  var LOAD_FAILURE = 'review-load-failure';

  elementRating.textContent = data.rating;
  elementText.textContent = data.description;

  var newImage = new Image(124, 124);

  newImage.onload = function(evt) {
    clearTimeout(loadTimeout);
    elementAuthor.src = evt.target.src;
    elementAuthor.alt = evt.target.alt;
  };

  newImage.onerror = function() {
    element.classList.add(LOAD_FAILURE);
  };

  var loadTimeout = setTimeout(function() {
    newImage.src = '';
    element.classList.add(LOAD_FAILURE);
  }, IMAGE_LOAD_TIMER);

  newImage.src = data.author.picture;
  newImage.alt = data.author.name;

  return element;
};
