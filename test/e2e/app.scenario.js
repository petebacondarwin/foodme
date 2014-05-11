describe('foodme app', function() {

  describe('Customer info form', function() {

    beforeEach(function() {
      browser.get('index.html');
    });


    it('should add $invalid CSS class to invalid inputs', function() {
      var nameInput = element(by.model('customer.name'));
      nameInput.clear();
      expect(nameInput.getAttribute('class')).toContain('ng-invalid');
    });

    it('should disable the button when a field is invalid', function() {
      var nameInput = element(by.model('customer.name'));
      var getRestaurantsButton = element(by.css('form[name="customerForm"] button'));
      nameInput.clear();
      expect(getRestaurantsButton.getAttribute('disabled')).toEqual('true');
    });
  });

});