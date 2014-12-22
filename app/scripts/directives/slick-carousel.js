require('angular');
require('slick-carousel');

module.exports = /*@ngInject*/ function () {
    return {
        restrict: 'AE',
        scope: {
            images: "="
        },
        templateUrl: 'templates/slick-carousel.html',
        link: function (scope, element, attr) {
        }
    };
};