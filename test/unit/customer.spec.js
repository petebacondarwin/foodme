describe('customer', function() {
  var customer, localStorage, $rootScope;

  beforeEach(module('customer'));

  describe('CustomerController', function() {
    var customer, scope;

    beforeEach(inject(function($controller, $rootScope) {
      customerInfo = {
        name: 'Bob Green', address: '123 Main St; Anytown AB 12345'
      };
      scope = $rootScope;
      $controller('CustomerController', {$scope: scope, customerInfo: customerInfo });
    }));


    it('should set up customer from customerInfo service', function() {
      expect(scope.customer.name).toEqual('Bob Green');
      expect(scope.customer.address).toEqual('123 Main St; Anytown AB 12345');
    });


    it('should save customer name and address to customer', function() {
      scope.customer.name = 'newName';
      scope.customer.address = 'newAddress';
      scope.$digest();
      expect(customerInfo).toEqual({ name: 'newName', address: 'newAddress'});
    });
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