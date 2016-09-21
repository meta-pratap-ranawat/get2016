var app = angular.module('myApp', []);
app.controller('PhoneListCtlr', function($scope){
  $scope.phones = [
    {
      'name': 'Motorola E3',
      'modelSlogal': 'Go faster with E series',
      'age': 2
    },

    {
      'name': 'MI 3S Prim',
      'modelSlogal': 'New HD life with LTE',
      'age': 1
    },

    {
      'name': 'LYF flame 7',
      'modelSlogal': 'Jio life',
      'age': 3
    }
  ];
  console.log($scope);
})
