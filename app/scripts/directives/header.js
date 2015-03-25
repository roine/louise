require('angular');

angular.module('app')
    .directive('header', HeaderDirective);

/*@ngInject*/
function HeaderDirective() {
    return {
        templateUrl: 'templates/header.html',
        scope: {
            options: "="
        },
        link: function () {
        }
    };
}

