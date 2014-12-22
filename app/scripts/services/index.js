require('angular');
angular.module('app')
    .factory('parse', require('./parse'))
    .factory('requestsCache', require('./cache').requests)
    .provider('imageLoader', require('./image-loader'));

