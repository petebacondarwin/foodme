describe('fmRating', function() {

  var $rootElement, $rootScope, $compile, ratingScope;

  beforeEach(function() {
    this.addMatchers({
      toHaveClass: function(className, expectedCount) {
        var error, actual = this.actual, actualCount = 0;
        this.message = function() { return error; };

        if (actual.length < expectedCount) {
          error = 'Expected at least ' + expectedCount + ' but was ' + actual.length;
        } else {
          for(var i = 0, ii = actual.length; i < ii; i++) {
            if (actual.eq(i).hasClass(className)) {
              actualCount ++;
            }
          }
          if ( actualCount !== expectedCount ) {
            error = 'Expected ' + className + ' on ' + expectedCount + ' elements but it appeared on ' + actualCount + ' elements';
          }
        }
        return !error;
      }
    });
  });

  beforeEach(module('common/fmRating','js/common/fmRating/fmRating.template.html'));

  var compileHtml = function(html) {
    $rootElement.html(html ||
      '<fm-rating symbol="*" max="5" readonly="{{readonly}}" ' +
        'rating="model.value"></fm-rating>');
    $compile($rootElement)($rootScope);
    $rootScope.$apply('model = { value: 0 }');
    ratingScope = $rootElement.find('ul').scope();
  };

  beforeEach(inject(function(_$compile_, _$rootScope_, _$rootElement_) {
    $rootElement = _$rootElement_;
    $rootScope = _$rootScope_;
    $compile = _$compile_;
  }));


  it('should update the view on model', function() {
    compileHtml();
    $rootScope.$apply('model.value = 3');
    expect($rootElement.find('li')).toHaveClass('fm-selected', 3);
  });


  it('should update the model on click', function() {
    compileHtml();
    ratingScope.select(3-1);
    $rootScope.$apply();
    expect($rootScope.model.value).toEqual(3);

    expect($rootElement.find('li')).toHaveClass('fm-selected', 3);
  });

  it('should update the model on hover', function() {
    compileHtml();

    expect($rootElement.find('li')).toHaveClass('fm-hover', 0);

    ratingScope.enter(3-1);
    $rootScope.$apply();

    expect($rootElement.find('li')).toHaveClass('fm-hover', 3);

    ratingScope.leave(3-1);
    $rootScope.$apply();

    expect($rootElement.find('li')).toHaveClass('fm-hover', 0);
  });

  it('should ignore clicks when disabled', function() {
    compileHtml();
    $rootScope.readonly = true;
    $rootScope.$apply();

    ratingScope.select(3-1);
    $rootScope.$apply();
    expect($rootScope.model.value).toEqual(0);

    expect($rootElement.find('li')).toHaveClass('fm-selected', 0);
  });

  it('should ignore hover when disabled', function() {
    compileHtml();
    $rootScope.readonly = true;
    $rootScope.$apply();

    ratingScope.enter(3-1);
    $rootScope.$apply();

    expect($rootElement.find('li')).toHaveClass('fm-hover', 0);
  });

  it('should work inside ng-repeat', function() {
    compileHtml('<div ng-repeat="i in [1, 2, 3]"><fm-rating rating="i"></fm-rating></div>');
    expect($rootElement.find('div').eq(0).find('li')).toHaveClass('fm-selected', 1);
    expect($rootElement.find('div').eq(1).find('li')).toHaveClass('fm-selected', 2);
    expect($rootElement.find('div').eq(2).find('li')).toHaveClass('fm-selected', 3);
  });
});