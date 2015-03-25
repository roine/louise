require('angular');
require('./../services/parse');

/*@ngInject*/
function HomeCtrl(parse) {

    var vm = this;
    vm.page = "home-page";

    parse.getOptions().then(function (options) {
        vm.options = options;
    });

    parse.getProjects().then(function (projects) {
        vm.projects = projects;
    });
}

module.exports = HomeCtrl;
