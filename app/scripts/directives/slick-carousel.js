require('angular');
require('slick-carousel');
var $ = require('jquery');

angular.module('app')
    .directive('slickCarousel', SlickCarouselDirective);

/*@ngInject*/
function SlickCarouselDirective($timeout) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            images: "="
        },
        templateUrl: 'templates/slick-carousel.html',
        link: function (scope, element, attrs) {
            var initialized = false;

            function initialize() {
                var options = [];
                var acceptedOptions = [
                    'dots',
                    'autoplay',
                    'autoplaySpeed',
                    'speed'
                ];

                angular.forEach(attrs, function (value, attr) {
                    if (~acceptedOptions.indexOf(attr)) {
                        options[attr] = scope.$eval(value);
                    }
                });

                options = angular.extend(options, attrs.options);

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
}
