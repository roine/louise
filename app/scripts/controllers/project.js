require('angular');

module.exports = function ($scope, $routeParams, parse) {
    parse.findBySlug($routeParams.projectSlug).then(function (result) {
        console.log(result)
        $scope.project = result;
    });

}