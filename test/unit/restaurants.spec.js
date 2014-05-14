describe("restaurants", function() {

  describe('RestaurantsController', function() {

    var scope;
    var RESTAURANT_DATA = [
        {
          "price": 3, "id": "esthers", "cuisine": "german",
          "rating": 3, "name": "Esther's German Saloon"
        },
        {
          "price": 4, "id": "robatayaki", "cuisine": "japanese",
          "rating": 5, "name": "Robatayaki Hachi"
        },
        {
          "price": 2, "id": "tofuparadise", "cuisine": "vegetarian",
          "rating": 1, "name": "BBQ Tofu Paradise"
        },
        {
          "price": 5, "id": "bateaurouge", "cuisine": "french",
          "rating": 4, "name": "Le Bateau Rouge"
        },
        {
          "price": 3, "id": "khartoum", "cuisine": "african",
          "rating": 2, "name": "Khartoum Khartoum"
        }
      ];

    beforeEach(module('restaurants'));

    beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope;

      $controller('RestaurantsController', {$scope: scope, restaurants: RESTAURANT_DATA});
      scope.$digest();
    }));


    it('should filter by price', function() {

      expect(scope.filteredRestaurants.length).toBe(5);

      scope.$apply('price = 3');
      expect(scope.filteredRestaurants.length).toBe(3);
      expect(scope.filteredRestaurants).toEqual([
        jasmine.objectContaining({id: 'esthers'}),
        jasmine.objectContaining({id:'tofuparadise'}),
        jasmine.objectContaining({id:'khartoum'})
      ]);

      scope.$apply('price = ""');
      expect(scope.filteredRestaurants.length).toBe(5);
    });


    it('should filter by rating', function() {
      expect(scope.filteredRestaurants.length).toBe(5);

      scope.$apply('rating = 3');
      expect(scope.filteredRestaurants.length).toEqual(3);
      expect(scope.filteredRestaurants).toEqual([
        jasmine.objectContaining({id: 'esthers'}),
        jasmine.objectContaining({id:'robatayaki'}),
        jasmine.objectContaining({id:'bateaurouge'})
      ]);

      scope.$apply('rating = ""');
      expect(scope.filteredRestaurants.length).toEqual(5);
    });

    it('should filter by both rating and price', function() {
      expect(scope.filteredRestaurants.length).toBe(5);

      scope.$apply('rating = 3; price = 3');
      expect(scope.filteredRestaurants.length).toEqual(1);
      expect(scope.filteredRestaurants).toEqual([
        jasmine.objectContaining({id:'esthers'})
      ]);
    });

    it('should filter by cuisine', function() {
      expect(scope.filteredRestaurants.length).toBe(5);

      scope.$apply(function() {
        scope.cuisine = ['german'];
      });

      expect(scope.filteredRestaurants.length).toEqual(1);
      expect(scope.filteredRestaurants).toEqual([
        jasmine.objectContaining({id:'esthers'})
      ]);

      scope.$apply(function() {
        scope.cuisine = ['african', 'german'];
      });

      expect(scope.filteredRestaurants.length).toEqual(2);
      expect(scope.filteredRestaurants).toEqual([
        jasmine.objectContaining({id:'esthers'}),
        jasmine.objectContaining({id:'khartoum'})
      ]);
    });
  });
});