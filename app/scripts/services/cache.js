require('angular');
angular.module('app')
    .factory('requestsCache', CacheRequestsService);

/*@ngInject*/
function CacheRequestsService($cacheFactory) {
    return $cacheFactory('requests');
}
