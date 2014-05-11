describe("customer", function() {

  beforeEach(module('customer'));

  describe("CustomerController", function() {
    it("should initialize the scope", inject(function($rootScope, $controller) {
      $controller('CustomerController', { $scope: $rootScope });
      expect($rootScope.customer).toEqual({
        name: "Joe Black",
        address: "432 Wiggly Rd, Mountain View, 94043"
      });
      expect($rootScope.findRestaurants).toEqual(jasmine.any(Function));
    }));
  });

});
