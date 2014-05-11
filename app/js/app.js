angular.module('foodme', ['ngRoute', 'customer'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'CustomerController',
      templateUrl: 'views/customerInfo.html'
    })
    .when('/who-we-are', {
      templateUrl: 'views/who-we-are.html'
    })
    .when('/how-it-works', {
      templateUrl: 'views/how-it-works.html'
    })
    .when('/help', {
      templateUrl: 'views/help.html'
    });
}]);