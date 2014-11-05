require('angular');

module.exports = function (parse) {
    return {
        restrict: 'E',
        templateUrl: 'templates/fixedMenu.html',
        replace: true,
        link: function (scope) {
            parse.getOptions().then(function (options) {
                scope.options = options;
            });
            parse.getProjects().then(function (projects) {
               scope.projects = projects;
                console.log(projects)
            });
        }
    };
};