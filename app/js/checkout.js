angular.module('checkout', [])

.controller('CheckoutController', ['$scope', 'shoppingCart', 'customerInfo', '$location',
  function($scope, shoppingCart, customerInfo, $location) {

  if ( !shoppingCart.restaurant ) {
    $location.path('/');
  }

  $scope.shoppingCart = shoppingCart;
  $scope.restaurantId = shoppingCart.restaurant.id;
  $scope.deliverTo = customerInfo;
  $scope.submitting = false;

  $scope.purchase = function() {

    if ($scope.submitting) return;

    $scope.submitting = true;

    shoppingCart.submitOrder($scope.deliverTo).then(
      function(orderId) {
        $location.path('thank-you').search({orderId: orderId});
      },
      function(err) {
        alert('There was a problem submitting your order');
        $scope.submitting = false;
      }
    );
  };
}]);