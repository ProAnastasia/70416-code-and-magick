'use strict';

var THREE_DAYS = 1000 * 60 * 60 * 24 * 3;
var MIN_MARK = 3;
var MAX_MARK = 3;

module.exports = function(list, filterID) {
  switch (filterID) {
    case 'reviews-recent':
      var currentDate = Date.now();
      var threeDaysAgo = currentDate - THREE_DAYS;

      return list.filter(function(elem) {
        var created = Number(new Date(elem['created']));
        return created >= threeDaysAgo;
      }).sort(function(a, b) {
        return b.created - a.created;
      });

    case 'reviews-good':
      return list.filter(function(elem) {
        return elem['rating'] >= MIN_MARK;
      }).sort(function(a, b) {
        return b['rating'] - a['rating'];
      });

    case 'reviews-bad':
      return list.filter(function(elem) {
        return elem['rating'] < MAX_MARK;
      }).sort(function(a, b) {
          return a['rating'] - b['rating'];
      });

    case 'reviews-popular':
      return list.sort(function(a, b) {
        return b['review_usefulness'] - a['review_usefulness'];
      });

    case 'reviews-all':
      return list;
  }
  return list;
};
