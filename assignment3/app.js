(function() {
  'use strict'

/*
Solution for assignment 3 of the course 'Single Page Web Applications with AngularJS' on Coursera.

Assignment: https://github.com/jhu-ep-coursera/fullstack-course5/tree/master/assignments/assignment3
Course: https://www.coursera.org/learn/single-page-web-apps-with-angularjs/

Dries Verachtert <dries.verachtert@dries.eu>
*/
  
angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('menuItemsEndPoint', 'https://davids-restaurant.herokuapp.com/menu_items.json')
  .directive('foundItems',FoundItemsDirective);
  
  function FoundItemsDirectiveController() {
    var ctrl = this;
  };

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrowCtrl = this;
    
    narrowCtrl.searchTerm = "";
    narrowCtrl.warningMessage = "";
    narrowCtrl.found = [];
    
    narrowCtrl.filterList = function() {
      if (narrowCtrl.searchTerm == "") {
	console.log("searchTerm empty, so setting warningMessage");
	narrowCtrl.warningMessage = "Nothing found (no search term)";
	return;
      }
      narrowCtrl.warningMessage = "";
      
      var promise = MenuSearchService.getMatchedMenuItems(narrowCtrl.searchTerm.toLowerCase());
      
      promise.then(function(response) {
	console.log("filterList, in then");
	console.log(response);
	narrowCtrl.found = response;
	if (response.length == 0) {
	  console.log("empty list after filtering, so setting warningMessage");
	  narrowCtrl.warningMessage = "Nothing found (empty list after filtering)"; 
	}
      })
      .catch(function(error) {
        console.log(error);
      });
    };
    
    narrowCtrl.removeItem = function(index) {
      console.log("removeItem called with index=" + index);
      narrowCtrl.found.splice(index,1);
    };
  };
  
  MenuSearchService.$inject = ['$http', 'menuItemsEndPoint'];
  function MenuSearchService($http, menuItemsEndPoint) {
    var service = this;
    
    service.getMatchedMenuItems = function(searchTerm) {
      var response = $http({
	method: 'GET',
	url: menuItemsEndPoint
      });

      var response2 = response.then(function(result) {
	console.log("start in then in getMatchedMenuItems");
	console.log(result);
	var foundItems = [];
	for (var i = 0; i< result.data.menu_items.length; i++) {
	  var menuItem = result.data.menu_items[i];
	  if (menuItem.name.toLowerCase().indexOf(searchTerm) !== -1) {
	    foundItems.push(menuItem);
	  }
	}
	console.log("getMatchedMenuItems, after filtering: ");
	console.log(foundItems);
	return foundItems;
      });
      return response2;
    };
  };
  
  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
	found: '<',
	onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'ctrl',
      bindToController: true
    };
    
    return ddo;
  };
})();