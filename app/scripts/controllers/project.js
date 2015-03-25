require('angular');
require('./../services/image-loader');
require('./../services/parse');

/*@ngInject*/
function ProjectCtrl(images, project, options) {
    var vm = this;
    vm.page = "project-page";

    vm.project = project;
    vm.images = images;
    vm.options = options;
}

ProjectCtrl.resolve = {
    images: /*@ngInject*/ function (imageLoader, $stateParams) {
        return imageLoader.init($stateParams.projectSlug);
    },
    project: /*@ngInject*/ function (parse, $stateParams) {
        return parse.findBySlug($stateParams.projectSlug);
    },
    options: /*@ngInject*/ function (parse, $timeout) {
        return parse.getOptions();
    }
};

module.exports = ProjectCtrl;