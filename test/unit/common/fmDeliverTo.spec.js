describe('deliverTo directive', function() {
  var customer, element;

  beforeEach(module('common/fmDeliverTo', 'js/common/fmDeliverTo/fmDeliverTo.template.html'));

  beforeEach(inject(function($compile, $rootScope) {
    element = $compile('<fm-deliver-to deliver-to="customer"></fm-deliver-to>')($rootScope);
    $rootScope.$apply('customer = {}');
  }));


  it("should display customer's address", inject(function($compile, $rootScope) {
    $rootScope.$apply('customer.address = "some really cool address"');
    expect(element.text()).toMatch(/Deliver to: some really cool address/);

    $rootScope.$apply('customer.address = "changed address"');
    expect(element.text()).toMatch(/Deliver to: changed address/);
  }));


  it("should display a link to change the delivery address", function() {
    var anchor = element.find('a');

    expect(anchor.attr('href')).toBe('#/customer-info');
    expect(anchor.text()).toBe('Change');
  });

});