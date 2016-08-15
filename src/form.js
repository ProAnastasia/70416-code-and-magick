'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var formMain = document.querySelector('.review-form');
  var userName = formMain.querySelector('.review-form-field-name');
  var reviewText = formMain.querySelector('.review-form-field-text');
  var hintsFields = formMain.querySelector('.review-fields');
  var hintName = hintsFields.querySelector('.review-fields-name');
  var hintDescription = hintsFields.querySelector('.review-fields-text');
  var submitBtn = formMain.querySelector('.review-submit');

  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      cb();
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
  };

  userName.required = true;
  submitBtn.disabled = true;
  userName.oninput = checkRequirements;
  reviewText.oninput = checkRequirements;

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  function checkRequirements() {
    //depends on this number we will require the review text or not
    var COMPARED_NUMBER = 3;

    var selectedMark = formMain.querySelector('input[type=\'radio\']:checked').value;

    reviewText.required = selectedMark < COMPARED_NUMBER;

    toggleVisibility(hintName, isEmptyField(userName));
    toggleVisibility(hintDescription, isEmptyField(reviewText));

    if (!isEmptyField(userName) && !isEmptyField(reviewText)) {
      hintsFields.classList.add('invisible');
    } else {
      hintsFields.classList.remove('invisible');
    }

    submitBtn.disabled = isEmptyField(userName) || isEmptyField(reviewText);
  }

  function isEmptyField(input) {
    if (input.value) {
      return false;
    }
    return true;
  }

  function toggleVisibility(elem, state) {
    if(state) {
      elem.classList.remove('invisible');
    } else {
      elem.classList.add('invisible');
    }
  }

  return form;
})();
