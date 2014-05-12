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

.controller('MenuController', ['$scope', 'restaurant', 'customerInfo',
  function($scope, restaurant, customerInfo) {
    $scope.restaurant = restaurant;
    $scope.deliverTo = customerInfo;
}])

.controller('RestaurantsController', ['$scope', 'customerInfo', '$location', 'restaurants',
  function($scope, customerInfo, $location, restaurants) {

  if (!customerInfo.address) {
    $location.path('/customer-info');
  }

  $scope.deliverTo = customerInfo;

  $scope.restaurants = restaurants;

  function filterRestaurants() {
    $scope.filteredRestaurants = [];
    angular.forEach($scope.restaurants, function(restaurant) {
      if ( ( !$scope.rating || restaurant.rating >= $scope.rating ) &&
           ( !$scope.price || restaurant.price <= $scope.price ) )
      {
        $scope.filteredRestaurants.push(restaurant);
      }
    });
  }

  $scope.$watch('restaurants', filterRestaurants);
  $scope.$watch('rating', filterRestaurants);
  $scope.$watch('price', filterRestaurants);

}]);