angular.module('customer', ['common/localStorage'])

.factory('customerInfo', ['localStorageBinding', function(localStorageBinding) {

  return localStorageBinding('fmCustomer');

}])

.controller('CustomerController', ['$scope', 'customerInfo', '$location',
  function CustomerController($scope, customerInfo, $location) {

  $scope.customer = customerInfo;

  $scope.findRestaurants = function() {
    $location.path('/');
  };
}]);