'use strict';

var reviewItem = require('./get-review');

var ACTIVE = 'review-quiz-answer-active';

var Review = function(data) {
  this.quizAnswerYes = this.element.querySelector('.review-quiz-answer-yes');
  this.quizAnswerNo = this.element.querySelector('.review-quiz-answer-no');
  this.data = data;
  this.element = reviewItem(data);
  var self = this;
  
  this.quizAnswerYes.onclick = function() {
    self.chooseYes();
  };
  this.quizAnswerNo.onclick = function() {
    self.chooseNo();
  };
};

Review.prototype = {
  chooseYes: function() {
    this.quizAnswerNo.classList.remove(ACTIVE);
    this.quizAnswerYes.classList.add(ACTIVE);
  },
  chooseNo: function() {
    this.quizAnswerYes.classList.remove(ACTIVE);
    this.quizAnswerNo.classList.add(ACTIVE);
  },
  remove: function() {
    this.quizAnswerYes.onclick = null;
    this.quizAnswerNo.onclick = null;
  }
};

module.exports = Review;
