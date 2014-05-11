angular.module('foodme', ['ngRoute', 'customer', 'navigation', 'restaurants'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'RestaurantsController',
      templateUrl: 'views/restaurant-list.html'
    })
    .when('/customer-info', {
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