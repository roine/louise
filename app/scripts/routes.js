require('angular');
var ProjectCtrl = require('./controllers/project');
/*@ngInject*/
function Routes($locationProvider, $stateProvider) {
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
}

module.exports = Routes;
