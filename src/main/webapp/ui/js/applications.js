/* Getting the list of car page application */
var listOfCars = angular.module('listOfCars',[]);


/* Getting the detail of car page application */
var carDetails = angular.module('carDetails', ['listOfCars']);

/* Getting the car edit and create form page application */
var carForm = angular.module('carForm', []);