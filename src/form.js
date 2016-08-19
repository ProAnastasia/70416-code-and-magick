'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var formMain = document.querySelector('.review-form');
  var radioBtns = formMain.querySelectorAll('input[type=\'radio\']');
  var userName = formMain.querySelector('.review-form-field-name');
  var reviewText = formMain.querySelector('.review-form-field-text');
  var hintsFields = formMain.querySelector('.review-fields');
  var hintName = hintsFields.querySelector('.review-fields-name');
  var hintDescription = hintsFields.querySelector('.review-fields-text');
  var submitBtn = formMain.querySelector('.review-submit');
  var browserCookies = require('browser-cookies');


  //save invisible class into a const
  var HIDDEN = 'invisible';

  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove(HIDDEN);
      cb();
    },

    close: function() {
      formContainer.classList.add(HIDDEN);

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
  };

  getCookie();
  checkRequirements();
  userName.required = true;
  submitBtn.disabled = true;
  userName.oninput = checkRequirements;
  reviewText.oninput = checkRequirements;

  formMain.onsubmit = function() {
    setCookie('review-name', userName.value);
  };

  for (var i = 0; i < radioBtns.length; i++) {
    radioBtns[i].onchange = checkRequirements;
  }

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  function checkRequirements() {
    //depends on this number we will require the review text or not
    var COMPARED_NUMBER = 3;

    //get user's mark
    var selectedMark = formMain.querySelector('input[type=\'radio\']:checked').value;
    setCookie('review-mark', selectedMark);
    console.log(browserCookies.get('user-mark'));
    //toggle visibility of the name label depends on its input value
    var isNameValid = !!userName.value;
    toggleVisibility(hintName, isNameValid);

    //compare user mark with min required number, then check if review is required
    reviewText.required = selectedMark < COMPARED_NUMBER;

    //if review is required, check its value and save result, then toggle its label
    //because of "short circuit operators" this variable saves true/false for the review if it is required and only true if not
    var isReviewValid = !reviewText.required || !!(reviewText.value);
    toggleVisibility(hintDescription, isReviewValid);

    //depends on fields validation toggle btn and field with hints
    var bothFieldsValid = isNameValid && isReviewValid;
    submitBtn.disabled = !bothFieldsValid;
    toggleVisibility(hintsFields, bothFieldsValid);

    function toggleVisibility(elem, state) {
      elem.classList.toggle(HIDDEN, state);
    }
  }

  function setCookie(name, value) {
    browserCookies.set(name, value, {expires: setDate()});
  }

  function setDate() {
    var now = new Date();
    var expireDate = new Date();

    expireDate.setMonth(11, 9);

    if (expireDate - now <= 0) {
      expireDate.setFullYear(expireDate.getFullYear() + 1, 11, 9);
    }
    return (expireDate - now) / (24 * 60 * 60 * 1000);
  }

  function getCookie() {
    var name = browserCookies.get('review-name');
    var mark = browserCookies.get('review-mark');

    userName.value = name;
    for (var j = 0; j < radioBtns.length; j++) {
      if (radioBtns[j].value === mark) {
        radioBtns[j].checked = true;
      }
    }
  }

  return form;
})();
