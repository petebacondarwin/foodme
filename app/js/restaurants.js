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

}]);