require('angular');
angular.module('app')
    .directive('loadingIndicator', LoadingIndicatorDirective);

/*@ngInject*/
function LoadingIndicatorDirective($rootScope, $timeout) {
    return {
        restrict: 'E',
        template: '<div class="loading anim" ng-show="loading && showLoading"><div class="loading-content" ng-transclude></div></div>',
        replace: true,
        transclude: true,
        link: function (scope, elem, attr) {

            scope.loading = false;
            scope.showLoading = false;

            $rootScope.$on('$stateChangeStart', function () {
                scope.loading = true;
                scope.showLoading = false;
                $timeout(function () {
                    scope.showLoading = true;
                }, 500);
            });

            $rootScope.$on('$stateChangeSuccess', function () {
                scope.loading = false;
            });
        }
    };
}
