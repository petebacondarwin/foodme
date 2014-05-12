angular.module('restaurants', ['customer'])

.controller('RestaurantsController', ['$scope', 'customerInfo', '$location', '$http',
  function($scope, customerInfo, $location, $http) {

  if (!customerInfo.address) {
    $location.path('/customer-info');
  }

  $scope.deliverTo = customerInfo;

  $http.get('data/restaurants.json').then(function(response) {
    $scope.restaurants = response.data;
  });

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