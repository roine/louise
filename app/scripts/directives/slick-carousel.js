require('angular');
require('slick-carousel');
var $ = require('jquery');

module.exports = /*@ngInject*/ function ($timeout) {
    return {
        restrict: 'AE',
        scope: {
            images: "=",
            dots: "@",
            autoplay: "@",
            autoplaySpeed: "@",
            speed: "=",
            options: "="
        },
        replace: true,
        templateUrl: 'templates/slick-carousel.html',
        link: function (scope, element, attr) {
            var initialized = false;

            function initialize() {
                var options = [];
                if (scope.dots) {
                    options.dots = scope.$eval(scope.dots);
                }
                if (scope.autoplay) {
                    options.autoplay = scope.$eval(scope.autoplay);
                }
                if (scope.autoplaySpeed) {
                    options.autoplaySpeed = scope.$eval(scope.autoplaySpeed);
                }
                if (scope.speed) {
                    options.speed = scope.speed;
                }

                options = angular.extend(options, scope.options);

                $timeout(function () {
                    $(element).find('#project-slider').slick(options);
                });
            }

            if (!initialized) {
                scope.$watch('images', function (newVal, oldVal) {
                    if (angular.isDefined(newVal) && !initialized) {
                        initialize();
                        initialized = true;
                    }
                });
            }

        }
    };
};