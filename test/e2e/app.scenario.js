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

  describe('Static views', function() {

    it('should show the help view at /help', function() {
      browser.get('index.html#/help');
      expect(element(by.css('.fm-heading')).getText()).toEqual('Help');
    });

    it('should show the "who we are" view at /who-we-are', function() {
      browser.get('index.html#/who-we-are');
      expect(element(by.css('.fm-heading')).getText()).toEqual('Who we are');
    });

    it('should show the "how it works" view at /how-it-works', function() {
      browser.get('index.html#/how-it-works');
      expect(element(by.css('.fm-heading')).getText()).toEqual('How it works');
    });

  });

});