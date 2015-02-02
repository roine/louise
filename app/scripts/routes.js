require('angular');
require('./services');

module.exports = /*@ngInject*/ function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl',
        })
        .when('/projet/:projectSlug', {
            templateUrl: 'views/project.html',
            controller: 'ProjectCtrl',
            resolve: {
                images: function (imageLoader, $route, $timeout) {
                    return imageLoader.init($route.current.params.projectSlug);
                }
            }
        })
        .otherwise('/');
};
