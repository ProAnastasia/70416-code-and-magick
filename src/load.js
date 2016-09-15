'use strict';

var LOAD_TIMEOUT = 2000;

function catchError(text) {
  console.log('caught error is ' + text);
}

module.exports = function(request, options, callback) {
  var xhr = new XMLHttpRequest();
  var from = options.from;
  var to = options.to;
  var filter = options.filter;

  request += '?from=' + from + '&to=' + to + '&filter=' + filter;

  xhr.open('GET', request);
  xhr.timeout = LOAD_TIMEOUT;

  xhr.onload = function() {
    var response = JSON.parse(this.responseText);

    if (this.status === 200 && this.readyState === 4) {
      callback(response);
    } else {
      catchError(this.statusText);
    }
  };

  xhr.onerror = function() {
    catchError(this.statusText);
  };

  xhr.ontimeout = function() {
    catchError('time for loading this data is ended');
  };

  xhr.send();
};

