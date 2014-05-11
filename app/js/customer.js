angular.module('customer', ['common/localStorage'])

.factory('customerInfo', ['localStorageBinding', function(localStorageBinding) {

  return localStorageBinding('fmCustomer');

}])

.controller('CustomerController', ['$scope', 'customerInfo',
  function CustomerController($scope, customerInfo) {

  $scope.customer = customerInfo;

  $scope.findRestaurants = function() {
    alert($scope.customer.name + ' - ' + $scope.customer.address);
  };
}]);