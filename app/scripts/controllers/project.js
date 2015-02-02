require('angular');

module.exports = /*@ngInject*/ function ($scope, $routeParams, parse, imageLoader, images) {

    // get the project information
    parse.findBySlug($routeParams.projectSlug).then(function (result) {
        $scope.project = result;
    });
    // images have been resolved and are ready to be served
    $scope.images = images;

    parse.getOptions().then(function(options){
        $scope.options = options;
    });
};