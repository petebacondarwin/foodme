describe('customer', function() {
  var customer, localStorage, $rootScope;

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

  describe("customerInfo", function() {
    beforeEach(module(function($provide) {
      localStorage = {
        fmCustomer: '{"name":"init-name","address":"init-address"}'
      };

      $provide.value('localStorage', localStorage);
    }));

    beforeEach(inject(function(_customerInfo_, _$rootScope_) {
      customer = _customerInfo_;
      $rootScope = _$rootScope_;
    }));


    it('should update any change to localStorage', function() {
      $rootScope.$apply(function() {
        customer.name = 'Michael Jackson';
        customer.address = '2231 Planet Mars, Apt 501';
      });

      expect(localStorage.fmCustomer)
        .toBe('{"name":"Michael Jackson","address":"2231 Planet Mars, Apt 501"}');
    });


    it('should load initial value from localStorage', function() {
      expect(customer.name).toBe('init-name');
      expect(customer.address).toBe('init-address');
    });
  });
});