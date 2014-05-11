angular.module('foodme', ['ngRoute', 'customer'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'CustomerController',
      templateUrl: 'views/customerInfo.html'
    });
}]);