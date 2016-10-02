var customerApp = angular.module('customerApp', []);
console.log("checking start");
customerApp.controller('honeListCtlr',honeListCtlr);
console.log("heloo");
honeListCtlr.$inject =['$scope','$http'];

function honeListCtlr($scope, $http) {



  $scope.ram = 1000;
console.log($scope.ram);
}
console.log("rama");
