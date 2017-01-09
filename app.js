(function() {
  'use strict';
  
  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);
  
  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.dishesList = "";
    $scope.message = "";
    $scope.emptyDishesRemovedMessage = "";
    
    $scope.nonEmptyDishesList = [];
    
    $scope.checkIfTooMuch = function() {
      if ($scope.dishesList == "") {
	$scope.message = "Please enter data first";
	$scope.messageClass = "redMessage";
	$scope.dishesListClass = "inputRedBorder";

      } else {
	$scope.nonEmptyDishesList = [];
	$scope.emptyDishesRemovedMessage = "";
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
