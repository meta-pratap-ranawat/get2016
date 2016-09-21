
var app = angular.module('myApp', []);

app.controller('PhoneListCtlr',PhoneListCtlr);

PhoneListCtlr.$inject =['$scope','$http'];

function PhoneListCtlr($scope, $http) {

  $http.get('phones.json').success(function(data) {

    $scope.phones = data;

  });

  $scope.orderProp = 'age';

}
