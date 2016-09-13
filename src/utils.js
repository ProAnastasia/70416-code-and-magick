'use strict';
var HIDDEN = 'invisible';

module.exports = {
  toggleVisibility: function(elem, state) {
    elem.classList.toggle(HIDDEN, state);
  },
  throttle: function(fn, delay) {
    var time = Date.now();

    return function() {
      if (Date.now() - time >= delay) {
        fn();
        time = Date.now();
      }
    };
  }
};
