(function() {
  'use strict'
  
/*
Solution for assignment 2 of the course 'Single Page Web Applications with AngularJS' on Coursera.

Assignment: https://github.com/jhu-ep-coursera/fullstack-course5/tree/master/assignments/assignment2
Course: https://www.coursera.org/learn/single-page-web-apps-with-angularjs/

Dries Verachtert <dries.verachtert@dries.eu>
*/
  
  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
  
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;
    toBuy.toBuyItems = ShoppingListCheckOffService.getToBuyItems();
    
    toBuy.moveItem = function(index) {
      ShoppingListCheckOffService.moveItem(index);
    }; 
  }
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBought = this;
    alreadyBought.alreadyBoughtItems = ShoppingListCheckOffService.getAlreadyBoughtItems();
    
  }
  function ShoppingListCheckOffService() {
    var service = this;
    var toBuyItems = [
      { name: "oranges", quantity: 5 },
      { name: "pears", quantity: 3 },
      { name: "lemons", quantity: 4 },
      { name: "apples", quantity: 3 },
      { name: "bananas", quantity: 2 },
      { name: "carrots", quantity: 3 }
    ];
    var alreadyBoughtItems = [];
    
    service.getToBuyItems = function() {
      return toBuyItems;
    };
    service.getAlreadyBoughtItems = function() {
      return alreadyBoughtItems;
    };
    service.moveItem = function(index) {
      var theItemInArray = toBuyItems.splice(index, 1);
      alreadyBoughtItems.push(theItemInArray[0]);
    };
  }
})();