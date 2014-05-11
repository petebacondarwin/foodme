describe('foodme app', function() {

  beforeEach(function() {
    browser.get('index.html');
    browser.executeScript('window.fmTempCust = window.localStorage.getItem("fmCustomer");');
    browser.executeScript('window.localStorage.setItem("fmCustomer", \'{ "address": "abc" }\');');
  });
  afterEach(function() {
    browser.executeScript('window.localStorage.setItem("fmCustomer", window.fmTempCust);');
  });

  describe('Customer info form', function() {

    beforeEach(function() {
      browser.get('index.html#/customer-info');
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

  describe('Navbar', function() {
    it('should activate the current navbar item', function() {
      var activeItem = element(by.css('.active'));

      browser.get('index.html#/');
      expect(activeItem.getText()).toEqual('Home');

      browser.get('index.html#/how-it-works');
      expect(activeItem.getText()).toEqual('How it works');

      browser.get('index.html#/who-we-are');
      expect(activeItem.getText()).toEqual('Who we are');
    });
  });

  describe('Restaurant List', function() {

    it('should redirect to customer-info if no customer address', function() {
      browser.executeScript('window.localStorage.removeItem("fmCustomer");');
      browser.get('index.html#/');
      expect(browser.getCurrentUrl()).toContain('customer-info');

      browser.executeScript('window.localStorage.setItem("fmCustomer", \'{ "address": "abc" }\');');
      browser.get('index.html#/');
      expect(browser.getCurrentUrl()).not.toContain('customer-info');
    });

    it('should display three restaurants', function() {
      browser.get('index.html#/');
      expect(element(by.css('.fm-restaurant-list .fm-heading')).getText()).toEqual('39 restaurants found!');
      expect(element.all(by.css('.fm-restaurant-list tbody tr')).count()).toEqual(39);
    });
  });

});