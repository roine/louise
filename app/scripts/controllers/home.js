require('angular');

/*@ngInject*/
function HomeCtrl(parse, $scope) {

    $scope.page = "home-page";

    parse.getOptions().then(function (options) {
        $scope.options = options;
    });

    parse.getProjects().then(function (projects) {
        $scope.projects = projects;
        console.log('projects', projects);
    });
}

module.exports = HomeCtrl;
