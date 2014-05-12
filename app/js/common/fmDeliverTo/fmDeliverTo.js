angular.module('common/fmDeliverTo', [])

.directive('fmDeliverTo', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/common/fmDeliverTo/fmDeliverTo.template.html',
    scope: {
      deliverTo: '='
    }
  };
});