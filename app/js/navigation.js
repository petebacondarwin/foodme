angular.module('navigation',[])

.controller('NavbarController', ['$scope', '$location', function($scope, $location) {

  $scope.routeIs = function(routeName) {
    return $location.path() === routeName;
  };

}]);