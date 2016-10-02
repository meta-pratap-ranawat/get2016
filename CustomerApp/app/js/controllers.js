var myJava = angular.module('myJava', []);

myJava.controller('listView', listView);

listView.$inject = ['$scope','$http'];

function listView($scope, $http){
 var url = "http://localhost:8080/CustomerRestFulService/rest/CustomerService/customers";

 var onSuccess = function (data, status, headers, config) {
                 $scope.customers = data;
                 $scope.statusCode = status;
             };

  var onError = function (data, status, headers, config) {
                 $scope.statusCode = status;
             }

  var promise = $http.get(url).success(onSuccess).error(onError);
}
