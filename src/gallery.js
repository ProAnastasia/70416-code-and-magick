'use strict';

var utils = require('./utils');

var Gallery = function(pictures) {
  this.pictures = pictures;
  this.activePicture = 0;
  this.galleryWrap = document.querySelector('.overlay-gallery');
  this.previousImage = document.querySelector('.overlay-gallery-control-left');
  this.nextImage = document.querySelector('.overlay-gallery-control-right');
  this.currentPreviewsNum = document.querySelector('.preview-number-current');
  this.totalPreviewsNum = document.querySelector('.preview-number-total');
  this.closeGallery = document.querySelector('.overlay-gallery-close');
  this.picturePreview = document.querySelector('.overlay-gallery-preview');
//show start value of the previews count
  this.totalPreviewsNum.textContent = this.pictures.length;
};

Gallery.prototype.show = function(num) {
  var self = this;

  utils.toggleVisibility(this.galleryWrap, false);
  this.setActivePicture(num);
  this.previousImage.onclick = function() {
    if (self.activePicture > 0) {
      self.setActivePicture(self.activePicture - 1);
    }

  };
  this.nextImage.onclick = function() {
    if (self.activePicture < self.pictures.length - 1) {
      self.setActivePicture(self.activePicture + 1);
    }
  };
  this.closeGallery.onclick = function() {
    self.hide();
  };
};

Gallery.prototype.hide = function() {
  utils.toggleVisibility(this.galleryWrap, true);
  this.previousImage.onclick = null;
  this.nextImage.onclick = null;
  this.closeGallery.onclick = null;
};

Gallery.prototype.setActivePicture = function(num) {
  this.activePicture = num;

  var previousImage = this.picturePreview.querySelector('img');
  if (previousImage) {
    this.picturePreview.removeChild(previousImage);
  }

  var url = this.pictures[num];

  var image = new Image();
  image.src = url;
  this.picturePreview.appendChild(image);

  this.currentPreviewsNum.textContent = this.activePicture + 1;
};

module.exports = Gallery;
