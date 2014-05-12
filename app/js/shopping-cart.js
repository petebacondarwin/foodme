angular.module('shopping-cart',['common/alert'])

.factory('shoppingCart', ['localStorageBinding', 'alert', function(localStorageBinding, alert) {
  var service = {
    add: function(choice, restaurant) {

      if ( !service.restaurant.id ) {
        service.restaurant = restaurant;
      }

      if ( service.restaurant.id !== restaurant.id ) {
        alert('You cannot mix items from different restaurant - clear the shopping cart first.');
        return;
      }

      angular.forEach(service.items, function(item) {
        if (item.name === choice.name) {
          item.amount += 1;
          choice = null;
        }
      });

      if (choice) {
        service.items.push({
          name: choice.name,
          price: choice.price,
          amount: 1
        });
      }
    },

    remove: function(cartItem) {
      var index = service.items.indexOf(cartItem);
      if ( index !== -1 ) {
        service.items.splice(index, 1);
      }

      if (service.items.length === 0) {
        service.restaurant = {};
      }
    },

    total: function() {
      var sum = 0;
      angular.forEach(service.items, function(item) {
        sum += Number(item.price * item.amount);
      });
      return sum;
    },

    reset: function() {
      service.items = [];
      service.restaurant = {};
    },

  };


  service.items = localStorageBinding('fmCartItems', []);
  service.restaurant = localStorageBinding('fmCartRestaurant');

  return service;
}]);