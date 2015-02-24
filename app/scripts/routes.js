require('angular');
var ProjectCtrl = require('./controllers/project');
/*@ngInject*/
function Routes($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl',
        })
        .when('/projet/:projectSlug', {
            templateUrl: 'views/project.html',
            controller: 'ProjectCtrl',
            resolve: ProjectCtrl.resolve
        })
        .otherwise('/');
}

module.exports = Routes;
