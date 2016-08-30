'use strict';
var HIDDEN = 'invisible';

module.exports = {
  toggleVisibility: function(elem, state) {
    elem.classList.toggle(HIDDEN, state);
  }
};
