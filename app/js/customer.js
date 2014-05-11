angular.module('customer', [])

.controller('CustomerController', ['$scope', function CustomerController($scope) {
  $scope.customer = {
    name: "Joe Black",
    address: "432 Wiggly Rd, Mountain View, 94043"
  };
  $scope.findRestaurants = function() {
    alert($scope.customer.name + ' - ' + $scope.customer.address);
  };
}]);