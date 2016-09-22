
var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtlr',PhoneListCtlr);

PhoneListCtlr.$inject =['$scope','$http'];

function PhoneListCtlr($scope, $http) {

  $http.get('../phones/phones.json').success(function(data) {

    $scope.phones = data;

  });

  $scope.orderProp = 'age';

}

phonecatControllers.controller('PhoneDetailCtlr',PhoneDetailCtlr);

PhoneDetailCtlr.$inject =['$scope','$routeParams'];

function PhoneDetailCtlr($scope, $routeParams) {

  $scope.name = $routeParams.name;

  });

}
