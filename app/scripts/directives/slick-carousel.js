require('angular');
require('slick-carousel');
var $ = require('jquery');

module.exports = /*@ngInject*/ function ($timeout) {
    return {
        restrict: 'AE',
        scope: {
            images: "="
        },
        replace: true,
        templateUrl: 'templates/slick-carousel.html',
        link: function (scope, element, attr) {
            var initialized = false;

            function initialize(){
                $timeout(function(){
                    $(element).slick();
                });
            }
            if(!initialized){
                scope.$watch('images', function(newVal, oldVal){
                    if(angular.isDefined(newVal) && !initialized){
                        initialize();
                        initialized = true;
                    }
                });
            }

        }
    };
};