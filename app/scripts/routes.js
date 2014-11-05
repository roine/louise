module.exports = function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
        })
        .when('/projet/:projectId', {
            templateUrl: 'views/project.html',
            controller: 'ProjectCtrl'
        })
        .otherwise('/');
};