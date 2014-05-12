angular.module('restaurants', ['customer'])

.factory('restaurantsPromise', ['$http', function($http) {
  return $http.get('data/restaurants.json').then(function(response) {
    return response.data;
  });
}])

.controller('MenuController', ['$scope', function($scope) {

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