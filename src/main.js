'use strict';

require('./form');
require('./game');
require('./reviews');
var Gallery = require('./gallery');

/* work with gallery */
var galleryImages = document.querySelectorAll('.photogallery-image');
var galleryLength = galleryImages.length;
var pictures = [];

/* get images sources */
for (var i = 0; i < galleryLength; i++) {
  pictures.push(galleryImages[i].querySelector('img').src);
}

var gallery = new Gallery(pictures);

/* assign events handlers to all pics using closures */
for (var j = 0; j < galleryLength; j++) {
  showImage(j);
}

function showImage(num) {
  galleryImages[num].onclick = function() {
    gallery.show(num);
  };
}

(function() {
  var game = new window.Game(document.querySelector('.demo'));
  game.initializeLevelAndStart();
  game.setGameStatus(window.Game.Verdict.INTRO);

  var formOpenButton = document.querySelector('.reviews-controls-new');

  /** @param {MouseEvent} evt */
  formOpenButton.onclick = function(evt) {
    evt.preventDefault();

    window.form.open(function() {
      game.setGameStatus(window.Game.Verdict.PAUSE);
      game.setDeactivated(true);
    });
  };

  window.form.onClose = function() {
    game.setDeactivated(false);
  };
})();
