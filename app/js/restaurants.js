angular.module('restaurants', ['customer'])

.factory('restaurantsPromise', ['$http', function($http) {
  return $http.get('data/restaurants.json').then(function(response) {
    return response.data;
  });
}])

.factory('currentRestaurantPromise', ['restaurantsPromise', '$route', '$routeParams',
  function(restaurantsPromise, $route, $routeParams) {

  return function() {
    return restaurantsPromise.then(function(restaurants) {
      for(var i=0; i < restaurants.length; i++) {
        if ( restaurants[i].id === $route.current.params.restaurantId ) {
          return restaurants[i];
        }
      }
    });
  };
}])

.controller('MenuController', ['$scope', 'restaurant', 'customerInfo', 'shoppingCart',
  function($scope, restaurant, customerInfo, shoppingCart) {
    $scope.restaurant = restaurant;
    $scope.deliverTo = customerInfo;
    $scope.shoppingCart = shoppingCart;
}])

.controller('RestaurantsController', ['$scope', 'customerInfo', '$location', 'restaurants',
  function($scope, customerInfo, $location, restaurants) {

  if (!customerInfo.address) {
    $location.path('/customer-info');
  }

  $scope.deliverTo = customerInfo;

  $scope.restaurants = restaurants;

  $scope.cuisine = [];

  $scope.CUISINE_OPTIONS = {
    african: 'African',
    american: 'American',
    barbecue: 'Barbecue',
    cafe: 'Cafe',
    chinese: 'Chinese',
    'czech/slovak': 'Czech / Slovak',
    german: 'German',
    indian: 'Indian',
    japanese: 'Japanese',
    mexican: 'Mexican',
    pizza: 'Pizza',
    thai: 'Thai',
    vegetarian: 'Vegetarian'
  };

  function filterRestaurants() {
    $scope.filteredRestaurants = [];
    angular.forEach($scope.restaurants, function(restaurant) {
      if ( ( !$scope.rating || restaurant.rating >= $scope.rating ) &&
           ( !$scope.price || restaurant.price <= $scope.price ) &&
           ( !$scope.cuisine.length || $scope.cuisine.indexOf(restaurant.cuisine) !== -1) )
      {
        $scope.filteredRestaurants.push(restaurant);
      }
    });
  }

  $scope.$watch('restaurants', filterRestaurants);
  $scope.$watch('rating', filterRestaurants);
  $scope.$watch('price', filterRestaurants);
  $scope.$watchCollection('cuisine', filterRestaurants);

}]);