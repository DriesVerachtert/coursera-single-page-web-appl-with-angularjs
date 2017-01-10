(function() {
  'use strict';

/*
Solution for assignment 1 of the course 'Single Page Web Applications with AngularJS' on Coursera.

Assignment: https://github.com/jhu-ep-coursera/fullstack-course5/tree/master/assignments/assignment2
Course: https://www.coursera.org/learn/single-page-web-apps-with-angularjs/

Dries Verachtert <dries.verachtert@dries.eu>
*/
  
  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);
  
  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.dishesList = "";
    $scope.message = "";
    $scope.emptyDishesRemovedMessage = "";
    
    $scope.nonEmptyDishesList = [];
    
    $scope.checkIfTooMuch = function() {
      $scope.emptyDishesRemovedMessage = "";

      if ($scope.dishesList == "") {
	$scope.message = "Please enter data first";
	$scope.messageClass = "redMessage";
	$scope.dishesListClass = "inputRedBorder";
      } else {
	$scope.nonEmptyDishesList = [];
	var splittedList = $scope.dishesList.split(',');
	for (var i = 0; i < splittedList.length; i++) {
	    if (splittedList[i].trim() != "") {
		$scope.nonEmptyDishesList.push(splittedList[i]);
	    } else {
		$scope.emptyDishesRemovedMessage = "At least 1 empty dish name was removed from the list!";
	    }
	}
	if ($scope.nonEmptyDishesList.length <= 3) {
	    $scope.message = "Enjoy!";
	    $scope.messageClass = "greenMessage";
	    $scope.dishesListClass = "inputGreenBorder";
	} else {
	    $scope.message = "Too much!";
	    $scope.messageClass = "greenMessage";
	    $scope.dishesListClass = "inputGreenBorder";
	}
      }
      console.log("button clicked: " + $scope.dishesList);
    };
  }
  
})();
