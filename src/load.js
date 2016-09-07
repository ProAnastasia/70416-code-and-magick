'use strict';

module.exports = (function(url, callback) {
  var script = document.createElement('script');
  script.src = url;
  document.body.appendChild(script);
  var reviews = [];

  window.JSONPCallback = function(data) {
    reviews = data;
    callback(reviews);
  };
});
