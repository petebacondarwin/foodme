angular.module('restaurants', ['customer'])

.controller('RestaurantsController', ['$scope', 'customerInfo', '$location', function($scope, customerInfo, $location) {

  if (!customerInfo.address) {
    $location.path('/customer-info');
  }

}]);