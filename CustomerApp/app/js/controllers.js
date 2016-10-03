var myJava = angular.module('myJava', ["ngRoute"]);

myJava.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'view/gridView.html',
        controller: 'listView'
      }).
      when('/home', {
        templateUrl: 'view/gridView.html',
        controller: 'listView'
      }).
      when('/menu1', {
        templateUrl: 'view/listView.html',
        controller: 'listView'
      }).
      when('/menu2', {
        templateUrl: 'view/newAddView.html',
        controller: 'listView'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);


myJava.controller('listView', listView);

listView.$inject = ['$scope','$http','$location'];

function listView($scope, $http, $location){
 var url = "http://localhost:8080/CustomerRestFulService/rest/CustomerService/customers";

 var onSuccess = function (data, status, headers, config) {
                 $scope.customers = data;
                 $scope.statusCode = status;
             };

  var onError = function (data, status, headers, config) {
                 $scope.statusCode = status;
             }

  var promise = $http.get(url).success(onSuccess).error(onError);

  $scope.submitForm = function(){
      $scope.customers.push($scope.newCustomer);
    //  $location.path('#home');
  };

  $scope.deleteRecord = function(customer){
    var index = $scope.customers.indexOf(customer);
  $scope.customers.splice(index, 1);
  };
}
