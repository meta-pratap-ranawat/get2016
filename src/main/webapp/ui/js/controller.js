/* The controller for getting the car list */
listOfCars.controller('carList', ['$scope', '$http', function($scope, $http) {

	
    /* For getting the list of cars available */
    $scope.loadCars = function(){
        $http({
        	method: 'GET', 
        	
        		url: 'http://localhost:8080/Project/carlist',
        		 headers : {'Content-Type': 'application/json'}
        		}).then(function(response) {
            if (response.status === 200) {
                $scope.cars = response.data.data;
            }
        });  
    }
  
   
}]);

; 



/* Controller for getting the car details */
listOfCars.controller('details',['$scope', '$http',  function($scope, $http) {

    /* For loading the car details */
	
	
    $scope.getCarDetail = function(id){
        $http({
        	method: 'GET',
        	url: 'http://localhost:8080/Project/carDetails?id='+id,
        	 headers : {'Content-Type': 'application/json'}
        	}).then(function(response) {
            if (response.status === 200) {
                $scope.car = response.data.data;
            }
        });
    }
    
    
}]);

/* Controller for the car create and edit form */
listOfCars.controller('formFilling', function($scope, $http, $window) {

    /* For loading the car details */
    $scope.getCarDetail = function(id){
        if(angular.isUndefined(id)) {
            $scope.car = {};
        } else {
            $http({
            	method: 'GET', 
            	url: 'http://localhost:8080/Project/carDetails?id='+id,
            	 headers : {'Content-Type': 'application/json'}
            	}).then(function(response) {
                if (response.status === 200) {
                    $scope.car = response.data.data;
                }
            });
        }
    }

    /* For submitting the form data */
    $scope.submitForm = function() {
        $http({
            method : 'POST',
            url : 'http://localhost:8080/Project/createCar',
            data : $scope.car,
            headers : {'Content-Type': 'application/json'}
        }).success(function(data) {
            $scope.cancel();
            $window.location.reload();
        });
    }
});
