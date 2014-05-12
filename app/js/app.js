angular.module('foodme', ['ngRoute', 'customer', 'navigation', 'restaurants', 'common/filters', 'common/fmDeliverTo'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'RestaurantsController',
      templateUrl: 'views/restaurant-list.html',
      resolve: {
        restaurants: ['restaurantsPromise', function(restaurantsPromise) { return restaurantsPromise; }]
      }
    })
    .when('/menu/:restaurantId', {
      controller: 'MenuController',
      templateUrl: 'views/menu.html',
      resolve: {
        restaurant: ['currentRestaurantPromise',
                      function(currentRestaurantPromise) { return currentRestaurantPromise(); }]
      }
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