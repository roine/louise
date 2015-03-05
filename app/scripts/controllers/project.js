require('angular');
require('./../services');

/*@ngInject*/
function ProjectCtrl(images, project, options) {
    var vm = this;
    vm.page = "project-page";

    vm.project = project;
    vm.images = images;
    vm.options = options;
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