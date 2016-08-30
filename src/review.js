'use strict';

module.exports = function getReviewItem(data, container) {
  var reviewTemplate = document.querySelector('template');
  var authorImage = new Image();
  var imageLoadTimeout = null;
  var IMAGE_LOAD_TIMEOUT = 10000;
  var elementToClone = null;

  if ('content' in reviewTemplate) {
    elementToClone = reviewTemplate.content.querySelector('.review');
  } else {
    elementToClone = reviewTemplate.querySelector('.review');
  }

  var element = elementToClone.cloneNode(true);
  var imageElement = element.querySelector('img');

  authorImage.onload = function(evt) {
    clearTimeout(imageLoadTimeout);
    imageElement.width = '124';
    imageElement.height = '124';
    imageElement.src = evt.target.src;
  };

  authorImage.onerror = function() {
    element.classList.add('review-load-failure');
  };

  imageLoadTimeout = setTimeout(function() {
    element.classList.add('hotel-nophoto');
  }, IMAGE_LOAD_TIMEOUT);

  authorImage.src = data.author.picture;

  element.querySelector('.review-text').textContent = data.description;
  container.appendChild(element);

  return element;
};
