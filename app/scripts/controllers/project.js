require('angular');

module.exports = /*@ngInject*/ function ($scope, $routeParams, parse, imageLoader) {
    parse.findBySlug($routeParams.projectSlug).then(function (result) {
        console.log(result)
        $scope.project = result;
    });

    imageLoader.init($routeParams.projectSlug).then(function (images) {
        $scope.images = images;
        console.log(images);
    })

}