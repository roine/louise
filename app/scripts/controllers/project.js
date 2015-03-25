require('angular');
require('./../services/image-loader');
require('./../services/parse');
class ProjectCtrl {
    /*@ngInject*/
    constructor(project, images, options) {
        this.page = "project-page";

        this.project = project;
        this.images = images;
        this.options = options;
    }

    static resolve() {
        return {
            images: /*@ngInject*/ function (imageLoader, $stateParams) {
                return imageLoader.init($stateParams.projectSlug);
            },
            project: /*@ngInject*/ function (parse, $stateParams) {
                return parse.findBySlug($stateParams.projectSlug);
            },
            options: /*@ngInject*/ function (parse, $timeout) {
                return parse.getOptions();
            }
        }
    }
}

angular.module('app')
    .controller('ProjectCtrl', ProjectCtrl);

module.exports = ProjectCtrl;