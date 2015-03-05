require('angular');
var ProjectCtrl = require('./controllers/project');
/*@ngInject*/
function Routes($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'vm'
        })
        .when('/projet/:projectSlug', {
            templateUrl: 'views/project.html',
            controller: 'ProjectCtrl',
            controllerAs: 'vm',
            resolve: ProjectCtrl.resolve
        })
        .otherwise('/');
}

module.exports = Routes;
