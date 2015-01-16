require('angular');

module.exports = /*@ngInject*/ function ($scope, $routeParams, parse, imageLoader, images) {
    parse.findBySlug($routeParams.projectSlug).then(function (result) {
        $scope.project = result;
    });

    imageLoader.init($routeParams.projectSlug).then(function (images) {
        $scope.images = images;
    });

    console.log(images);

}