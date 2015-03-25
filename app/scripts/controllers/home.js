require('angular');
require('./../services/parse');

class HomeCtrl {
    /*@ngInject*/
    constructor(parse) {

        this.page = 'home-page';
        parse.getOptions().then((options) => {
            this.options = options;
        });

        parse.getProjects().then((projects) => {
            this.projects = projects;
        });
    }
}

angular.module('app')
    .controller('HomeCtrl', HomeCtrl);


