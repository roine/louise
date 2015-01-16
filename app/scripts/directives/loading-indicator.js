module.exports = /*@ngInject*/ function ($rootScope) {
    return {
        restrict: 'E',
        template: '<div class="loading" ng-show="loading"><div class="loading-content" ng-transclude></div></div>',
        replace: true,
        transclude: true,
        link: function (scope, elem, attr) {

            scope.loading = false;

            $rootScope.$on('$routeChangeStart', function () {
                scope.loading = true;
            });

            $rootScope.$on('$routeChangeSuccess', function () {
                scope.loading = false;
            });
        }
    }
}