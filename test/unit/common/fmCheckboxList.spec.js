describe('fmCheckboxList directive', function() {
  var inputs, scope, element;

  beforeEach(module('common/fmCheckboxList'));

  beforeEach(inject(function($compile, $rootScope) {
    scope = $rootScope;
    scope.filter = {};
    scope.OPTIONS = { a: 'A', b: 'B', c: 'C', d: 'D' };

    element = angular.element(
      '<div fm-checkbox-list ng-model="filter.cuisine">' +
        '<label ng-repeat="(name, title) in OPTIONS" class="checkbox">' +
          '<input type="checkbox" value="{{name}}"> {{title}}' +
        '</label>' +
      '</div>');

    document.body.appendChild(element[0]);

    $compile(element)(scope);
    scope.$apply();

    inputs = element.find('input');
  }));

  afterEach(function() {
    element.remove();
  });

  var triggerClickOn = function(elm) {
    var event = document.createEvent('MouseEvents');
    // https://developer.mozilla.org/en-US/docs/DOM/event.initMouseEvent
    event.initMouseEvent('click', true, true, window);
    elm[0].dispatchEvent(event);
  };


  it('should update the view on model change', function() {
    scope.$apply(function() {
      scope.filter.cuisine = ['a', 'b'];
    });

    expect(inputs.eq(0).prop('checked')).toBe(true);
    expect(inputs.eq(1).prop('checked')).toBe(true);
    expect(inputs.eq(2).prop('checked')).toBe(false);
    expect(inputs.eq(3).prop('checked')).toBe(false);
  });


  it('should update the model on view change', function() {
    triggerClickOn(inputs.eq(0));
    scope.$digest();
    expect(scope.filter.cuisine).toEqual(['a']);

    triggerClickOn(inputs.eq(2));
    expect(scope.filter.cuisine).toEqual(['a', 'c']);

    triggerClickOn(inputs.eq(0));
    expect(scope.filter.cuisine).toEqual(['c']);
  });
});