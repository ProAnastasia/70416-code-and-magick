'use strict';

module.exports = function(data) {
  var reviewTemplate = document.querySelector('template');
  var elementToClone = (reviewTemplate.content || reviewTemplate).querySelector('.review');
  var element = elementToClone.cloneNode(true);

  element.querySelector('.review-rating').textContent = data.rating;
  element.querySelector('.review-text').textContent = data.description;

  var newImage = new Image(124, 124);

  newImage.onload = function(evt) {
    element.querySelector('.review-author').src = evt.target.src;
    element.querySelector('.review-author').alt = evt.target.alt;
  };

  newImage.onerror = function() {
    element.classList.add('review-load-failure');
  };

  newImage.src = data.author.picture;
  newImage.alt = data.author.name;
  return element;
};
