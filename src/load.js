'use strict';

module.exports = function(url, callback) {
  var script = document.createElement('script');
  script.src = url + '/?callback=' + callback;
  document.body.appendChild(script);
};

