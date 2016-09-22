var phonecatApp = angular.module('phonecatApp', [
  'ngRoute',
  'phonecatControllers'
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/phones', {
        templateUrl: 'phone-list.html',
        controller: 'PhoneListCtlr'
      }).
      when('/phones/:name', {
        templateUrl: 'phone-detail.html',
        controller: 'PhoneDetailCtlr'
      }).
      otherwise({
        redirectTo: '/phones'
      });
  }]);
