'use strict';

module.exports = function appendScript(url, cb) {
  var script = document.createElement('script');

  script.src = url + '?callback=' + cb;
  document.body.appendChild(script);
};
