'use strict';

var reviewItem = require('./get-review');

var Review = function(data) {
  this.data = data;
  this.element = reviewItem(data);
  this.quizAnswerYes = this.element.querySelector('.review-quiz-answer-yes');
  this.quizAnswerNo = this.element.querySelector('.review-quiz-answer-no');
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
    this.quizAnswerNo.classList.remove('review-quiz-answer-active');
    this.quizAnswerYes.classList.add('review-quiz-answer-active');
  },
  chooseNo: function() {
    this.quizAnswerYes.classList.remove('review-quiz-answer-active');
    this.quizAnswerNo.classList.add('review-quiz-answer-active');
  },
  remove: function() {
    this.quizAnswerYes.onclick = null;
    this.quizAnswerNo.onclick = null;
  }
};

module.exports = Review;
