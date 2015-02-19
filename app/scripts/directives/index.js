require('angular');
angular.module('app')
    .directive('slickCarousel', require('./slick-carousel'))
    .directive('loadingIndicator', require('./loading-indicator'))
    .directive('header', require('./header'));

