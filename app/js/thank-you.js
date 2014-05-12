angular.module('thank-you', [])

.controller('ThankYouController', ['$scope', '$routeParams', function($scope, $routeParams) {
  $scope.orderId = $routeParams.orderId;
}]);