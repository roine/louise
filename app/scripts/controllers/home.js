require('angular');

module.exports = function ($scope, parse) {
    parse.getOptions().then(function (options) {
        $scope.options = options;
    });
    parse.getProjects().then(function (projects) {
        $scope.projects = projects;
        console.log(projects);
    });
};