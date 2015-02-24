require('angular');
require('./../services');

/*@ngInject*/
function ProjectCtrl($scope, images, project, options) {

    $scope.page = "project-page";

    $scope.project = project;
    $scope.images = images;
    $scope.options = options;
}

ProjectCtrl.resolve = {
    images: /*@ngInject*/ function (imageLoader, $route) {
        return imageLoader.init($route.current.params.projectSlug);
    },
    project: /*@ngInject*/ function ($route, parse) {
        return parse.findBySlug($route.current.params.projectSlug);
    },
    options: /*@ngInject*/ function (parse) {
        return parse.getOptions();
    }
};

module.exports = ProjectCtrl;