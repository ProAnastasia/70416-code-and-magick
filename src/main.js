'use strict';

require('./form');
require('./game');
require('./reviews');
var Gallery = require('./gallery');

/* work with gallery */
/* get images sources */
var galleryImages = document.querySelectorAll('.photogallery-image');
var galleryLength = galleryImages.length;
var pictures = [];

for (var i = 0; i < galleryLength; i++) {
  pictures.push(galleryImages[j].querySelector('img').src);
}

var gallery = new Gallery(pictures);

for (var j = 0; j < galleryLength; j++) {
  showImage(i);
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
