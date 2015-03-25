require('angular');
var ProjectCtrl = require('./controllers/project');

angular.module('app')
    .config(Routes);

/*@ngInject*/
function Routes($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.hashPrefix('!');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'vm'
        })
        .state('projet', {
            url: '/projet/:projectSlug',
            templateUrl: 'views/project.html',
            controller: 'ProjectCtrl',
            controllerAs: 'vm',
            resolve: ProjectCtrl.resolve
        });

    $urlRouterProvider.otherwise('/');
}
